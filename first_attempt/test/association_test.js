const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
  //same vars cuz iam lazy
  let paul, blogPost, comment;
  const contentQuestion = 'http://www.theasciicode.com.ar/ascii-printable-characters/asterisk-ascii-code-42.html';

  beforeEach((done) => {
    paul = new User({name: 'Paul'});
    blogPost = new BlogPost({title: 'the meaning of life', content: contentQuestion});
    comment = new Comment({content: 'this might be valid.'});

    //TODO associate paul with blogPost
    //because blogPosts is an array on joe, so just push it // some mongoose magic!?
    paul.blogPosts.push(blogPost);

    //TODO associate blogPost with comment
    blogPost.comments.push(comment);

    //TODO associate paul with comment
    //magic again !? mongoose internal setter
    comment.user = paul;

    //saving() - done needs to be called as promise so use promise.all()
    //https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
    Promise.all([ paul.save(), blogPost.save(), comment.save()] )
      //chain then to resolve
      .then(() => done());
  });

  //mocha run only this test it.only
  it('saves a relation between user and blogpost', (done) =>{
    //User -> find record with criteria findOne({//}) -> modifier(BlogPost) -> then(exec)
    //modifiers load more data then only user and blogpost Association
    /*User.findOne({name: 'Paul'})
      .then((user) => {
        console.log(user);
        done();
      })*/
      //this time with modifiers populate()
      //http://mongoosejs.com/docs/populate.html
      User
        .findOne({name: 'Paul'})
        //resolve the blogPosts relation comes from User Model property name blogPosts
        .populate('blogPosts')
        .then((user) => {
          //console.log(user);
          //console.log(user.blogPosts[0]);
          assert(user.blogPosts[0].title === 'the meaning of life');
          done();
        });
  });

  //careful with this approach it might take very long if deeply nested
  it('saves a full relation(graph) between a user, a blogpost and a comment', (done) =>{
    User
      .findOne({name: 'Paul'})
      //modifier with configuration object
      .populate({
        //look into user object, find blogPosts and populate this with further object
        //read this like Userfindne, populate this with object, that 1st shows path to blogpsts and 2 .populate this path with comments

        path: 'blogPosts',
        populate: {
          path: 'comments',
          //and point to the model now
          model: 'comment',
          //inception http://i1.kym-cdn.com/photos/images/facebook/000/531/557/a88.jpg
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then((user) => {
        /*console.log('1 ',user);
        console.log('2', user.blogPosts[0]);
        console.log('3', user.blogPosts[0].comments[0]);*/
        //assert one prop each
        assert(user.name === 'Paul');
        assert(user.blogPosts[0].content === contentQuestion);
        assert(user.blogPosts[0].comments[0].content === 'this might be valid.');
        assert(user.blogPosts[0].comments[0].user.name === 'Paul');
        done();
      })
  });

});
