var Tick = require('mongoose').model('Tick');


//TODO: Transfer the following
exports.get = function(req, res, next){
  Tick.aggregate([
    { $match:
      { date: {
        $lt: 1456261139.7859,
        $gte: 1456259918.4981
    }}},
    // { $project: {
    //     day: {$day: $date},
    //     hour: {$hour: $date},
    //     minute: {$minute: $date},
    //     second: {$second: $date},
    //     date: 1,
    //     volume: 1
    // }},
    // {$sort: {date: 1}},
    // {$group:
    //   {_id: { day: $day, hour: $hour, minute: $minute, second: $second },
    //     date:  { $first: $time},
    //     "date":  {"$first": "$date"},
    //                 "open":  {"$first": "$price"},
    //                 "high":  {"$max": "$price"},
    //                 "low":   {"$min": "$price"},
    //                 "close": {"$last": "$price"},
    //                 "volume": {"$volume": "$volume"} }},

  function(err, ohlc){
    if(err) {
      console.error(err);
      return next(err);
    } else {
      res.json(ohlc);
    }}
  ])
}