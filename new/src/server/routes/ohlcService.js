var Tick = require('mongoose').model('Tick');


//TODO: Transfer the following
exports.get = function(req, res, next){
  console.log("This might work?");
  Tick.aggregate([
    { $match:
      { time: {
        $lt: 1456263063.6729,
        $gte: 1456261178.6822
    }}},
    { $project: {
        minute: {$minute: "$time"},
        time: 1,
        volume: 1
    }}
    // {$sort: {date: 1}},
    // {$group:
      // {_id: { minute: $minute },
      //   date:  { $first: $time},
      //   "date":  {"$first": "$date"},
      //               "open":  {"$first": "$price"},
      //               "high":  {"$max": "$price"},
      //               "low":   {"$min": "$price"},
      //               "close": {"$last": "$price"},
      //               "volume": {"$volume": "$volume"} }},
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