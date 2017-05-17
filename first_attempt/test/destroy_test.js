const assert = require('assert');
const User = require('../src/user');

describe('deleting a user', () => {
  let john;
  //create a new User
  beforeEach((done) => {
      john = new User({name: 'John'});
      john.save()
        .then(() => {
          done();
        })
  });

  //john instance
  it('Model instance remove', (done) => {
    john.remove()
    //chain promises here
    //1. find user
    //2. ensure, its not in collection anymore
      .then(() => User.findOne({name: 'John'}))
      //get cb from then before
      .then((user) => {
        assert(user === null /*{}*/);
        done();
      });
  });

  //User
  it('Class Method remove', (done) => {
    //remove a bunch of records with given criteria
    User.remove({name: 'John'})
      .then(() => User.findOne({name: 'John'}))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('Class Method findAndRemove', (done) => {});
  /*it('Class Method findByIDAndRemove', (done) => {});*/
});
