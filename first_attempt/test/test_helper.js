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
//plugin own Promise Libary ES6 Promise due deprecation warning
mongoose.Promise = global.Promise;

//connect and give the arg the information explicitly where to find the db
//in case of remote connection this string needs to be mongodb://ip:port/name
//while connecting and inserting some value, the instance will be createt by mongoose
//mongoose.connect('mongodb://localhost/users_test');
//promise here on connection()
//how long does it take to connect? async w8 for
//mongoose.connection
  //once -> log
  //.once('open', () => { })
  //on error, throw error
  //.on('error', (err) => {
  //  console.log('Error: ',err);
  //});

  //TODO rewrite this into before
before((done) => {
  mongoose.connect('mongodb://localhost/users_test');
  mongoose.connection
    .once('open', () => { done();})
    .on('error', (err) => {
      console.log('Error: ',err);
    });
});



//TODO add hook
//hook = executed before the testsuites run

//TODO drop all collections of BlogPost and Comment

beforeEach( (done) => {
  //direct call to drop all users
  //due async we need to make mocha w8 for the drop
  //use mocha done() callback

  const { users, comments, blogPosts } = mongoose.connection.collections;

  /*mongoose.connection.collections.users.drop(() => {
    done();
  });*/

  //not the best nesting but works
  //this is rewritable
  users.drop(() => {
    comments.drop(() => {
      blogPosts.drop(() => {
        done();
      });
    });
  });
});
