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


      it('it is possible to delete a post/subdocument from an existing record', (done) => {
        //create user with post subdocument
        const paul = new User({
          name: 'Paul',
          posts: [{title: 'title to be removed'}]
        });

          //save user
          paul.save()
          //fetch
            .then(()=> User.findOne({name:'Paul'}))
            //https://stackoverflow.com/questions/5809788/how-do-i-remove-documents-using-node-js-mongoose
            //remove subdocument here // do not use slice here! painful
            //better to use remove()
            //do not get consfused with paul.remove() what persists in DB
            .then((user) => {
              user.posts[0].remove();
              return user.save();
            })
            //fetch
            .then(() => User.findOne({name: 'Paul'}))
            //assertion
            .then((user) => {
              assert(user.posts.length === 0);
              done();
            });
      });

});
