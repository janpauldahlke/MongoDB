const assert = require('assert');
//npm install --save supertest
//fake http requests to app
const request = require('supertest');
const app = require('../app');

describe('The express app', () => {
                //async, so need done
  it('handles a GET request to /api', (done) => {
    //format of supertest requests
    request(app)
      .get('/api')
      //err is not! response error in stattuscode
      .end((err, response) => {
        console.log(response);
        done();
      });
  });
});
