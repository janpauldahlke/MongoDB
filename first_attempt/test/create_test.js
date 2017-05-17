/*TODO
 1. test creation of new user
 2. save it to the database
 3. test existence of createt user istance
*/
//args: 1.string with test desc, actual testsuites with it BLOCKS

//comes with mocha
const assert = require('assert');
//import user
//make it capital User, to show its a class while instance will be user lowercased
const User = require('../src/user');

describe('Creating records', () => {
  //args: string descript, func with the assertion of test
                //makeuse of test_helper done here
  it('saves a user', (done) => {
      //step 1 of TODO
      //instance object of User!! oneliner, spread it with more attribs later on
      //but jan will not be saved /persisted
      const joe = new User({ name: 'Joe' });
      //step 2 of TODO //nice and easy(?)
      //joe.save();
      //!!!!each iteration of this will create a new user again!! so care the doubling data by accidnent
      //to fix this:
      //mocha starts: empty db, test+1, emtpy db, test#2, emtpy db .. in test_helper.js beforeEach()

      //save() will return cb promise

    joe.save()
    //every entry egts a flag of isNew() ->boolean of it is not saved and after save isNew()===false
      .then(() => {
        //assertion and look for isNew
        assert(!joe.isNew);
        //use done
        done();
      });
  });
});
