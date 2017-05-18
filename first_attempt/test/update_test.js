const assert = require('assert');
const User = require('../src/user');

describe('update records in the Database', () => {
  let paul;

  //create some entry to test against
  beforeEach((done) => {
      paul = new User({name: 'Paul'});
      paul.save()
        .then(() => {
          done();
        });
  });


  //set and save
  it('instance type set and save', (done) => {
      let newName = 'Paul Johannes'
      //console.log(paul);
      paul.set('name',newName);
      /*paul.save()
        .then(() => {
          assert(paul.name.toString() === newName);
          console.log(paul.name);
          done();
        });*/
      paul.save()
        //get all users and assert that the name is = newName
        .then(() => User.find({/*empty object returns all Users*/}))
        //arg user contains callback from previous then
        .then((users) => {
          assert(users.length === 1);
          assert(users[0].name === newName);
          done();
        });
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

});
