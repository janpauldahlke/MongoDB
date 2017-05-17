const assert = require('assert');
const User = require('../src/user');

describe('Reading Users out of DB', () => {

  let joe;

  //lil hacky: to fight against the drop of test_helper
  beforeEach( (done) => {
    //no var,const,let because it wouldnt be availeble in scope for the it block
    joe = new User({name: 'Joe'});
    joe.save()
      .then(() => {
        done();
      });
  });

  it('Finds all Users with name Joe', (done) => {

    //each class has the find and findOne function
    //find(criteria) => return an array
    //findOne(criteria) => return a single record
    // User.find() e.g.
    User.find({name : 'Joe'})
      .then((users) => {
        console.log(users[0]._id, joe._id);
        //THIS cannot work, because mongoDb wraps IDs with Object IDs
        //even if IDs are as String identical the Object ID is different
        //a helper is toString() here
        assert(users[0]._id.toString() === joe._id.toString());
        done();
      });
  });

  it('Find a User with a specific ID', (done) => {

    User.findOne({ _id: joe._id})
        //single user! as arg
      .then((user) => {
        assert(user.name === 'Joe');
        done();
      });
  });
});
