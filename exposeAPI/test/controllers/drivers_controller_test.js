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
      driver.save()
        .then(() => {
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


    it('DELETE to /api/drivers/:id deletes the record', (done) => {
      const driver = new Driver({name : "ToBe Killed", email: "mail@mail.com"});
      driver.save()
        .then(() => {
          request(app)
            .delete(`/api/drivers/${driver._id}`)
            .end(() => {
              Driver.findOne({name : "ToBe Killed" })
                .then((driver) => {
                  assert(!driver);
                  done();
                });
            });
        });
    });

    it('GET to /api/drivers find driver near given location', (done) => {
      //hamburg 53.5511° N, 9.9937° (LAT/LON format)
      //frankfurt 50.1109° N, 8.6821° E (LAT/LON format)
      const hamburgDriver = new Driver({
        name: 'Paul',
        email: 'mail@mail.com',
        geo : {type: 'Point', coordinates : [9.9937, 53.5511 ]}
      });

      const frankfurtDriver = new Driver({
        name: 'Hans',
        email: 'hansl@mail.com',
        geo : {type: 'Point', coordinates : [8.6821, 50.1109 ]}
      });


      Promise.all([hamburgDriver.save(), frankfurtDriver.save()])
        .then(() => {
          request(app)
            //find hamburg
            .get('/api/drivers?lng=9&lat=53')
            .end((err, res) => {
              console.log('Body of response: ',res.body);
              //assert(response.body.length === 1);
              //assert(response.body[0].obj.email === 'mail@mail.com');
              done();
            });
        });
    });
});
