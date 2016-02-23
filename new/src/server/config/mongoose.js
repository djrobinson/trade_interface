var config = require('./development'),
    mongoose = require('mongoose');

module.exports = function(){
  var db = mongoose.connect(config.db);
  require('../models/tick.model');
  require('../models/last.model');
  return db;
}