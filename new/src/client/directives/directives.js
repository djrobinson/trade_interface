angular.module('myApp')

.directive('techanOhlc', function($parse) {
  return {
    restrict : 'E',
    template: '<div id="chart"></div>',
    controller: 'ohlcCtrl',
    link : function($scope, element, attr) {
    $scope.buildGraph = function(){
                console.log($scope.minDate);
                console.log($scope.maxDate);

        var margin = {top: 20, right: 20, bottom: 30, left: 50},
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;


        // var parseDate = d3.time.format("%d-%b-%y").parse;

        var x = techan.scale.financetime()
                .range([0, width]);

        var y = d3.scale.linear()
                .range([height, 0]);

        var candlestick = techan.plot.candlestick()
                .xScale(x)
                .yScale(y);

        var ichimoku = techan.plot.ichimoku()
                .xScale(x)
                .yScale(y);

        var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");

        var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left")
                .tickFormat(d3.format(",.3s"));

        var svg = d3.select("body").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.append("clipPath")
                .attr("id", "clip")
            .append("rect")
                .attr("x", 0)
                .attr("y", y(1))
                .attr("width", width)
                .attr("height", y(0) - y(1));

        // xhr.post("/ohlc/2016-03-01T09:24:50.000Z/2016-03-01T16:56:09.000Z", function(err, data){
        d3.json("/ohlc/"+$scope.minDate+"/"+$scope.maxDate, function(error, data) {
            var accessor = candlestick.accessor(),
                ichimokuIndicator = techan.indicator.ichimoku(),
                indicatorPreRoll = ichimokuIndicator.kijunSen()+ichimokuIndicator.senkouSpanB();  // Don't show where indicators don't have data

            data = data.map(function(d) {
                // Open, high, low, close generally not required, is being used here to demonstrate colored volume
                // bars
                var a = new Date(d['time'])
                return {
                    date: a,
                    volume: parseFloat(d['volume']),
                    open: parseFloat(d['open']),
                    high: parseFloat(d['high']),
                    low: parseFloat(d['low']),
                    close: parseFloat(d['close'])
                };
            }).sort(function(a, b) { return d3.ascending(accessor.d(a), accessor.d(b)); });

            var ichimokuData = ichimokuIndicator(data);
            x.domain(data.map(accessor.d));
            // Calculate the y domain for visible data points (ensure to include Kijun Sen additional data offset)
            y.domain(techan.scale.plot.ichimoku(ichimokuData.slice(indicatorPreRoll-ichimokuIndicator.kijunSen())).domain());

            // Logic to ensure that at least +KijunSen displacement is applied to display cloud plotted ahead of ohlc
            var zoomable = x.zoomable().clamp(false);
            zoomable.domain([indicatorPreRoll, data.length+ichimokuIndicator.kijunSen()]);

            svg.append("g")
                    .datum(ichimokuData)
                    .attr("class", "ichimoku")
                    .attr("clip-path", "url(#clip)")
                    .call(ichimoku);

            svg.append("g")
                    .datum(data)
                    .attr("class", "candlestick")
                    .attr("clip-path", "url(#clip)")
                    .call(candlestick);

            svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

            svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis)
                .append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 6)
                    .attr("dy", ".71em")
                    .style("text-anchor", "end")
                    .text("Ichimoku");
                });
            };
        }
    }
});


