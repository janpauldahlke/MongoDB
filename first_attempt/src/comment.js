const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: String,
  //reference to user/author
  user: {
    //http://mongoosejs.com/docs/schematypes.html
    type: Schema.Types.ObjectId,
    // ref to 'user property' from user.js
    // const User = mongoose.model('user', UserSchema);
    ref: 'user'
  }
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;
