const assert = require('assert');
const request = require('supertest');
const DriverController = require('../../controllers/drivers_controller');
const app = require('../../app');


describe('Drivers Controller', () => {
  it('POST to /api/drivers creates a new driver in DB', (done) => {
    request(app)
      .post('/api/drivers')
      //send data on post no send but more an add to
      .send({email : 'paul@paulspaul.paul'})
      .end(() => {
        //console.log(response.body);
        //assert(response.body.name === 'Paul');
        done();
      });
  });
});
