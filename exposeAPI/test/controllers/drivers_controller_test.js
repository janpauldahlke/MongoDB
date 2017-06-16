const assert = require('assert');
const request = require('supertest');
const DriverController = require('../../controllers/drivers_controller');
const mongoose = require('mongoose');
const app = require('../../app');
//workaround for mocha
const Driver = mongoose.model('driver');

//fight deprecation
//mongoose.Promise = global.Promise;

describe('Drivers Controller', () => {

  it('POST to /api/drivers creates a new driver in DB', (done) => {
    //count driver before and after insert

    //do not overwrite done() in callbacks methodology
    //https://github.com/mochajs/mocha/issues/1524

    //const sneakydone = done();

    Driver.count().then(count => {

      request(app)
        .post('/api/drivers')
        .send({name : 'Paul', email : 'paul@pauls.paul'})
        .end(() => {

          Driver.count().then(nc => {
            assert(count+1 === nc);
            //maybe https://www.npmjs.com/package/mocha-mongoose ??
            //sneakydone();
            done();
          });
        });
      });
    });

    it('PUT to /api/drivers/:id updates/edits the record', (done) => {
      //create driver and test against him on update
      //driving flag is default falsy
      const driver = new Driver({name: "Kraut", email:"rüben@kraut.de"});
      driver.save().
        then(() => {
          request(app)
            //reflect id
            //.put('/api/drivers/'+driver._id)
            .put(`/api/drivers/${driver._id}`)
            .send({driving: true})
            .end(() => {
              //get driver and assert
              Driver.findOne({ name : "Kraut" })
                .then((driver) => {
                  assert(driver.driving === true);
                  done();
                });
            });
        });


    });
});
