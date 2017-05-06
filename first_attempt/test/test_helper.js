//entry point for tests
/*
TODO s
connect mongoose to mongoDB
create a collection of users
-> create a user model, to create single instances of user
run tests after successful connect

*/

//require mongoose npm module
const mongoose = require('mongoose');
//connect and give the arg the information explicitly where to find the db
//in case of remote connection this string needs to be mongodb://ip:port/name
//while connecting and inserting some value, the instance will be createt by mongoose
mongoose.connect('mongodb://localhost/users_test');
//promise here on connection()
//how long does it take to connect? async w8 for
mongoose.connection
  //once -> log
  .once('open', () => console.log('good to go'))
  //on error, throw error
  .on('error', (err) => {
    console.log('Error: ',err);
  });
