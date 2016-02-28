var Tick = require('mongoose').model('Tick');


//TODO: Transfer the following
exports.get = function(req, res, next){
  Tick.aggregate([
    { $match:
      { time: {
        $lt: new Date("2016-02-28T21:39:57.000Z"),
        $gte: new Date("2016-02-28T19:18:51.000Z")
    }}},
    { $project: {
        minute: {$minute: "$time"},
        time: 1,
        volume: 1,
        price: 1
    }},
    {$sort: {time: 1}},
    {$group:
      {_id: { minute: "$minute"},
                    time:  {$first: "$time"},
                    open:  {$first: "$price"},
                    high:  {$max: "$price"},
                    low:   {$min: "$price"},
                    close: {$last: "$price"}}}
      ],
  function(err, ohlc){
    if(err) {
      console.log(err);
      return next(err);
    } else {
      res.json(ohlc);
    }
  })
}