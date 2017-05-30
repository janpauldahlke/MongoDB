//TODO create a user model

//req mongoose module
const mongoose = require('mongoose');
//import PostSchema
const PostSchema = require('./post');
//pull specific property of the mongoose object -> schema
const Schema = mongoose.Schema;



//define user and use schema object with config
const UserSchema = new Schema({
  //key : datatype
  //name: String,
  //validation of name in validation_test.js
  name : {
    type : String,
    //required flag from mongoose
    //http://mongoosejs.com/docs/validation.html
    required : [true, 'provide a user name: name is required!'],

    //TODO name >= 3chars
    //as object
    validate : {
      //rule
      validator : (name) => name.length > 2,
      //message in error case
      message : 'Name must be longer then 2 characters!'
    }
  },
  postCount : Number,
  //give UserSchema the information that posts have multiple [] PostSchema
  posts: [PostSchema]
});

//init user model, name it, pass UserSchema
//terminolgy userModel = userClass // is not an instance!! represents entire collection of data
//mongoose magic *puffPuff
const User = mongoose.model('user', UserSchema);

//AMD pattern export userClass to global scope
module.exports = User;
