var mongoose = require('mongoose');
    Schema = mongoose.Schema;

var LastSchema = new Schema({
  last: String
})

mongoose.model('Last', LastSchema);