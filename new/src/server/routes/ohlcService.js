var Tick = require('mongoose').model('Tick');


//TODO: Transfer the following
exports.get = function(req, res, next){
  Tick.aggregate([
    { $match:
      { time: {
        //2016-02-29T13:24:50.000Z
        //2016-03-01T14:51:20.000Z
        $lt: new Date("2016-03-01T14:51:20.000Z"),
        $gte: new Date("2016-02-29T13:24:50.000Z")
    }}},
    { $project: {
        minute: {$minute: "$time"},
        time: "$time",
        volume: 1,
        price: 1
    }},
    {$group:
      {_id: { minute: "$minute"},
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