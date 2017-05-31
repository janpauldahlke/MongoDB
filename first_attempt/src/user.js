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
  //TODO reflect postCount depending from number of posts
  //virtual types - will not be persistet
  //calculate this on the fly
  //https://stackoverflow.com/questions/32263222/virtual-field-and-real-field
  //postCount : Number,

  //give UserSchema the information that posts have multiple [] PostSchema
  posts: [PostSchema],
  //make the update increment test work again
  likes: Number
});

//virtual prop definition here
//they are seperate and outside of the UserSchema
//use function instead of => on get() to use this
//get() -> define getter on model (ES6 setter/getter)
UserSchema.virtual('postCount').get(function() {
  //return this;
  //this refers to the instance of the model
  //to do so use the function keyword not =>
  // => would bind context to this whole file and not the instance
  //use this carefully and keep it in mind!!

  return this.posts.length;

});

//init user model, name it, pass UserSchema
//terminolgy userModel = userClass // is not an instance!! represents entire collection of data
//mongoose magic *puffPuff
const User = mongoose.model('user', UserSchema);

//AMD pattern export userClass to global scope
module.exports = User;
