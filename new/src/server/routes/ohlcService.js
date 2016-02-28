var Tick = require('mongoose').model('Tick');


//TODO: Transfer the following
exports.get = function(req, res, next){
  Tick.aggregate([
    { $match:
      { time: {
        $lt: new Date("1970-01-17T20:37:04.716Z"),
        $gte: new Date("1970-01-17T20:36:56.402Z")
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