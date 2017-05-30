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
});
