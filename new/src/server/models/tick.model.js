var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TickSchema = new Schema({
  Date: number,
  Open: number,
  High: number,
  Low: number,
  Close: number,
  Volume: number
});

mongoose.model('Tick', TickSchema);