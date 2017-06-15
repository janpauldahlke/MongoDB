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

  xit('POST to /api/drivers creates a new driver in DB', (done) => {
    //count driver before and after insert

    //do not overwrite done() in callbacks methodology
    //https://github.com/mochajs/mocha/issues/1524

    //const sneakydone = done();

    Driver.count().then(count => {
      request(app)
        .post('/api/drivers')
        //send data on post no send but more an add to
        .send({name : 'Paul', email : 'paul@pauls.paul'})
        .end(() => {
          Driver.count().then(nc => {
            assert(count+12 === nc);
            //maybe https://www.npmjs.com/package/mocha-mongoose ??
            //sneakydone();
            done();
          });
        });
      });
    });
});
