var Tick = require('mongoose').model('Tick');

var startDate = '2016-02-24T19:35:04.000Z';
var endDate = '2016-02-28T19:35:04.000Z';

exports.create = function(req, res, next) {
  var tick = new Tick(req.body);
  console.log("new tick additions: ", req.body);
  tick.save(function(err){
    if(err) {
      return next(err);
    } else {
      res.json(tick);
    }
  })
}



exports.get = function(req, res, next) {
  var minDate = req.params.minDate;
  var maxDate = req.params.maxDate;
  console.log("End Date?", minDate);
  Tick.find({ time: {
        $lt: new Date(maxDate),
        $gte: new Date(minDate)
        // $lt: endDate,
        // $gte: startDate
    }}).exec(function(err, ticks){
    if (err) {
      return next(err);
    } else {
      res.json(ticks);
    }
  });
}

