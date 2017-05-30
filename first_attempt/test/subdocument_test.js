const assert = require('assert');
const User = require('../src/user');

describe('subdocuments', () => {

  it('can create and save subdocument', (done) => {
      const paul = new User({
        name : 'Paul',
        //give user paul the subdocument posts
        posts : [{title: 'first post title'}]

      });

      paul.save()
        .then(() => User.findOne({name : 'Paul'}))
        .then((user) => {
          assert(user.posts[0].title === 'first post title');
          done();
        });
    });

    it('adding a post to existng record', (done) => {
        //TODO create paul, save paul, ftech paul, add post to paul, save paul, ftech paul, assert post

        //create paul
        const paul = new User({
          name: 'Paul',
          //initiate empty array of post
          posts: []
        });
        //save paul
        paul.save()

        //ftech paul
          .then(() => User.findOne({name: 'Paul'}))
          .then((user) => {
            //add post to paul -> Array.push
            user.posts.push({ title: 'a newly pushed post onto existing user' });
            //save modififed paul
            //care! here is return for to make the next promise chainable, otherwise it would not work, cuz the function sctope doesnt give back a callback
            return user.save();
          })
          //ftech again
          .then(() => User.findOne({ name: 'Paul' }))
          //assert part
          .then((user) => {
              assert(user.posts[0].title === 'a newly pushed post onto existing user');
              done();
          });
      });
});
