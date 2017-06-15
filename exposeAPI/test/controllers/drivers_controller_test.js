const assert = require('assert');
const request = require('supertest');
const DriverController = require('../../controllers/drivers_controller');
const mongoose = require('mongoose');
const app = require('../../app');
//workaround for mocha
const Driver = mongoose.model('driver');

//fight deprecation
mongoose.Promise = global.Promise;

describe('Drivers Controller', () => {

  it('POST to /api/drivers creates a new driver in DB', (done) => {
    //count driver before and after insert
    Driver.count().then(count => {
      request(app)
        .post('/api/drivers')
        //send data on post no send but more an add to
        .send({name : 'Paul', email : 'paul@paulspaul.paul'})
        .end(() => {
          Driver.count().then(newCount => {
            assert(count+1 === newCount);
            //done() is not excercises
            //maybe https://www.npmjs.com/package/mocha-mongoose ??
            done();
          });
        });
    });
  });

});
