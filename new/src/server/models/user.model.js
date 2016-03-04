var mongoose = require('mongoose');
var bcrypt   =  require('bcrypt-nodejs');

//define schema
var userSchema = mongoose.Schema({
    local     :{
    email   : String,
    password  : String,
  }

});

//generates hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//check pw validity
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

//create model and export
module.exports = mongoose.model('User', userSchema);
