const assert = require('assert');
const User = require('../src/user');

describe('update records in the Database', () => {
  let paul;
  const newName = 'Paul Johannes'
  //create some entry to test against
  beforeEach((done) => {
      paul = new User({name: 'Paul'});
      paul.save()
        .then(() => {
          done();
        });
  });


  //a helper function to assert to prevent code duplicates
  //this could also be rewritten for read_test.js etc
  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === newName);
        done();
      });
  }

  //set and save
  it('instance type set and save', (done) => {
      //console.log(paul);
      paul.set('name',newName);
      /*paul.save()
        .then(() => {
          assert(paul.name.toString() === newName);
          console.log(paul.name);
          done();
        });*/

        //refactored into helper Function to avoid code duplicates
      /*paul.save()
        //get all users and assert that the name is = newName
        .then(() => User.find({/*empty object returns all Users*///}))
        //arg user contains callback from previous then
        /*.then((users) => {
          assert(users.length === 1);
          assert(users[0].name === newName);
          done();
        });*/
        assertName(paul.save(), done);
      });
/*
a practical approach how to use set and save
  function maybeUpdateName(user){//}
  function maybeUpdateAge(user){//}
  maybeUpdateName(user);
  maybeUpdateAge(user);
  user.save();
this would work on dynamicly and the logic to change would be in the functions
and save would be called in the end, w/o touching our database twice
*/

  //model instance can update
it('a model instance can update', (done) => {
    assertName(paul.update({name: newName}), done);
  });
});
