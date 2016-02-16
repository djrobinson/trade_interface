// add controllers
var app = angular.module('myApp')
    app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $httpProvider.defaults.headers.common['Access-Control-Allow-Origin','*'];
        }
    ]);
  app.controller('ohlcCtrl', function($scope, $http){

  $http({
    method: "GET",
    type: "JSONP",
    url: "https://api.kraken.com/0/public/OHLC?pair=ETHXBT&interval=5&since=1455514800"
    }).success(function(data){
      console.log(data);
      $scope.ohlc = data;
    })
});