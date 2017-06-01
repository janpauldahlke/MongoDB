const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {

  let paul, blogPost;
  //prepare test
  beforeEach((done) => {
    paul = new User({name: 'Paul'});
    blogPost = new BlogPost({title: 'pre hook and middleware', content: 'testing hooks on middleware'});

    paul.blogPosts.push(blogPost);

    Promise.all([paul.save(), blogPost.save()])
      .then(() => done());
  });
  //
  it('middleware cleans up existing blogPosts on users remove', (done) => {
    paul.remove()
    //https://docs.mongodb.com/manual/reference/method/db.collection.count/
      .then(() => BlogPost.count())
      .then((count) => {
        //console.log('-->', count)
        assert(count === 0);
        done();
      });
  });
});
