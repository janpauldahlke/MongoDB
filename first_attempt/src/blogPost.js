const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
  title: String,
  content: String,
  comments : [{
    //points to a different Collection ('Comment')
    //http://mongoosejs.com/docs/schematypes.html
    type: Schema.Types.ObjectId,
    //ref (mongoose specific) - wires ID from type with ref with Comment Model
    //refers to comment.js
    //const Comment = mongoose.model('comment', CommentSchema);
    ref: 'comment'
  }]
});

//make a Model
const BlogPost = mongoose.model('blogPost', BlogPostSchema);
//make Model visible to project
module.exports = BlogPost;
