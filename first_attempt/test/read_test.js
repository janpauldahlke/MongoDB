const assert = require('assert');
const User = require('../src/user');

describe('Reading Users out of DB', () => {

  let joe, jan, jon, john;

  //lil hacky: to fight against the drop of test_helper
  beforeEach( (done) => {
    //no var,const,let because it wouldnt be availeble in scope for the it block

    //rewrite this for skip() and limit() test
    joe = new User({name: 'Joe'});
    jan = new User({name: 'Jan'});
    jon = new User({name: 'Jon'});
    john = new User({name: 'John'});

    Promise.all([joe.save(), jan.save(), jon.save(), john.save])
      .then(() => done());

    /*joe.save()
      .then(() => {
        done();
      });*/
  });

  it('Finds all Users with name Joe', (done) => {

    //each class has the find and findOne function
    //find(criteria) => return an array
    //findOne(criteria) => return a single record
    // User.find() e.g.
    User.find({name : 'Joe'})
      .then((users) => {
        //console.log(users[0]._id, joe._id);
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

  //testing skip() and limit()

  it('can skip and limit the result set', (done) => {
    //again: empty object means give me all users // due no criteria
    //skipfirst user and limit return result to 2
    //add sort() to guarante the order
    User.find({})
    //https://docs.mongodb.com/manual/reference/method/cursor.sort/
      .sort({name: 1}) // 1 = ascending // while -1 descending
      .skip(1)
      .limit(2)
      .then((users) => {

        //risky assumption because, the save() operation in Promise.all([]) is parallel so one doesnt know the order of saving!!!!!!
        //assert(users[0].name === 'Jan');
        //assert(users[1].name === 'Jon');
        assert(users.length === 2);

        //to make sure, that we have still the same order
        //https://stackoverflow.com/questions/35554399/mongodb-skip-and-limit
        //chain oder()

        //test myself
        //console.log(users[0].name, users[1].name)
        assert(users[0].name === 'Joe');
        assert(users[1].name === 'Jon');

        done();
      })
  });
});
