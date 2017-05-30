//TODO create a user model

//req mongoose module
const mongoose = require('mongoose');

//pull specific property of the mongoose object -> schema
const Schema = mongoose.Schema;

//define user and use schema object with config
const UserSchema = new Schema({
  //key : datatype
  name: String,
  postCount : Number
});

//init user model, name it, pass UserSchema
//terminolgy userModel = userClass // is not an instance!! represents entire collection of data
//mongoose magic *puffPuff
const User = mongoose.model('user', UserSchema);

//AMD pattern export userClass to global scope
module.exports = User;
