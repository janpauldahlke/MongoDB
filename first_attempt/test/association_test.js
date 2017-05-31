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
  it.only('saves a relation between user and blogpost', (done) =>{
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
        .populate('blogPosts')
        .then((user) => {
          console.log(user);
          done();
        })

  });

  /*
  it('', () =>{

  });
  */
});
