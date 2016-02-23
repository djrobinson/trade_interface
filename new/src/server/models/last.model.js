var mongoose = require('mongoose');
    Schema = mongoose.Schema;

var LastSchema = new Schema({
  last: Number
})

mongoose.model('Last', LastSchema);