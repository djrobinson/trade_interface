var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TickSchema = new Schema({
  price: Number,
  volume: Number,
  time: Date,
  buysell: String,
  marketlimit: String,
  misc: Number
});

mongoose.model('Tick', TickSchema);