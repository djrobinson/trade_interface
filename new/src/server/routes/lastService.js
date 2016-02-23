var Last = require('mongoose').model('Last');

exports.create = function(req, res, next) {
  var last = new Last(req.body);
  console.log("Posted is", last);
  last.save(function(err){
    if(err) {
      return next(err);
    } else {
      res.json(last);
    }
  })
}

exports.get = function(req, res, next) {
  Last.findOne({}, {}, {
    sort : { last: -1 }
  }, function(err, lasts){
    if(err) {
      return next(err);
    } else {
      res.json(lasts);
    }
  })
}