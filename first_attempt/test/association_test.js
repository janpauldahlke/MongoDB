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
    joe.blogPosts.push(blogPost);

    //TODO associate blogPost with comment
    blogPost.comments.push(comment);

    //TODO associate paul with comment
    //magic again !?
    comment.user = paul;
  });

  /*it('', () =>{

  });


  it('', () =>{

  });
  */
});
