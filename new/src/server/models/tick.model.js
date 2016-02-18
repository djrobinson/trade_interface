var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TickSchema = new Schema({
  test: String
});

mongoose.model('Tick', TickSchema);