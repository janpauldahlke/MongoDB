/*TODO
  // 1. test_helper to prevent double entry on each test
  // difference between production and test env!
  // NODE_ENV
  // 2. catch err from posting unsuccess //
*/
const mongoose = require('mongoose');

before(done => {

  if(mongoose.connection.db) {
    done();
  } else {
    mongoose.connect('mongodb://localhost/expose_api_test');
    mongoose.connection
      .once('open', () => done())
      .on('error', () => {
        console.log('warning: ',err);
      });
  }
});

/*
beforeEach(done => {
  const { drivers } = mongoose.connection.collections;
  drivers.drop()
    //to prevent test db from dropping indeces fpr geoLoc
    .then(() => drivers.createIndex({ "geo.coordinates" : "2dsphere"}))
    .then(() => done())
    //catch first usage of DB, there will be no collection yet
    .catch(() => done());
});
*/

//foo
