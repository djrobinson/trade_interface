var Tick = require('mongoose').model('Tick');

var end = new Date();
var startDate = end.setDate(end.getDate() - 1);
var endDate = end.setDate(end.getDate());


//TODO: Transfer the following
exports.get = function(req, res, next){
  console.log("req params",req.params);
  var minDate = req.params.minDate;
  var maxDate = req.params.maxDate;
  Tick.aggregate([
    { $match:
      { time: {
        $lt: new Date(maxDate),
        $gte: new Date(minDate)
        // $lt: endDate,
        // $gte: startDate
    }}},
    { $project: {
        minute: {$minute: "$time"},
        hour: {$hour: "$time"},
        day: {$dayOfMonth: "$time"},
        time: "$time",
        volume: 1,
        price: 1
    }},
    {$group:
      {_id: { day: "$day", hour: "$hour", minute: "$minute" },
                    time:  {$first: "$time"},
                    open:  {$first: "$price"},
                    high:  {$max: "$price"},
                    low:   {$min: "$price"},
                    close: {$last: "$price"},
                    volume: {$sum: "$volume"}}},
      {$sort: {time: 1}}],
  function(err, ohlc){
    if(err) {
      console.log(err);
      return next(err);
    } else {
      res.json(ohlc);
    }
  })
}