var Tick = require('mongoose').model('Tick');

exports.create = function(req, res, next) {
  var tick = new Tick(req.body);
  console.log(req.body);
  tick.save(function(err){
    if(err) {
      return next(err);
    } else {
      res.json(tick);
    }
  })
}

exports.get = function(req, res, next) {
  Tick.find({}, function(err, ticks){
    if (err) {
      return next(err);
    } else {
      res.json(ticks);
    }
  });
}

