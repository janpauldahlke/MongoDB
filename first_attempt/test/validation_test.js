const assert = require('assert');
const User = require('../src/user');

describe('Validating records in the database', () => {

// http://mongoosejs.com/docs/validation.html
                            //no done. reason is usage of validateSync()
  it('requires a user name', (/*done*/) => {
    //for testing purpose
    const user = new User({name: undefined});
    //validateSync() vs validate() - what is async
    const validationResult = user.validateSync();
    //console.log(validationResult);
    //grab the deeply nested error
    //const message = validationResult.errors.name.message;
    const { message } = validationResult.errors.name;
    console.log(message);

    assert(message === 'provide a user name: name is required!');
    //done();
    /*
    user.validate((validationResult) => {
      //async operations against server
    });
    */
  });

  /*it('username is longer then 2 characters', (done) => {

  });*/

});
