const assert = require('assert');
const User = require('../src/user');

describe('update records in the Database', () => {
  let paul;
  const newName = 'Paul Johannes'
  //create some entry to test against
  beforeEach((done) => {
      paul = new User(
        { name: 'Paul',
          postCount: 0
        });
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

  //--------------------//
  //class based updates
  it('A model class can update', (done) =>{
      //needs to be called on User-Class
      //update with object 1st arg= waht are we looking for, 2nd arg is what to replace it with
    assertName(User.update({name: 'Paul'}, {name: newName}),
    done);
  });

  //findOneAndUpdate
  it('A model class can update one record', (done) =>{
    assertName(User.findOneAndUpdate({name: 'Paul'}, {name: newName}),
      done);
  });

  //findByIDAndUpdate
  it('A model class can find by ID and update', (done) =>{
      //2 args, 1. find what, 2. update with
    assertName(User.findByIdAndUpdate(paul._id, {name: newName}),
    done);
  });

  //--increment postCount
  // this test breaks with introduction of virtual types//
  //make it xit -- mocha will ignore xit
  xit('it is possible to update the users PostCount with increment', (done) => {
    //e.g.
    //paul.set('postCount', 1);
    //User.update({name: 'Paul'}, {postCount : 1})
    //but this is not incrementing it is setting! and would reset every postcount

    //TODO find every user with given name, load it onto server and increment by one
    //!best pratice; reason: every user needs to be loaded and saved what makes it slow, so dont!

    //TODO check
    //https://docs.mongodb.com/manual/reference/operator/update/
    //update modifiers = operators (terminolgy)
    /*
     <operator1>: { <field1>: <value1>, ... },
     <operator2>: { <field2>: <value2>, ... },
     */
     //useful for updating more then one record at once, perfermance gain

      User.update({name: 'Paul'},
      //operator $inc as 2nd arg
      //negaitve is $inc with negaitve numbers like {$inc {postCount: -}}
      { $inc: {postCount: 42} })
        .then( () =>
        User.findOne({name: 'Paul'}) )
        .then( (user) => {
          assert(user.postCount === 42);
          done();
        });
      });
});
