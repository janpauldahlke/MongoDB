const path = require('path');
const appDir = path.dirname(require.main.filename);
const Driver = require('../models/driver');



module.exports = {

  index(req, res) {
    res.sendFile('index.html', {"root": appDir});
  },

  helloWorld(req, res) {
    res.send( { hello : 'world' } );
  },

  //! implement npm body-parser
  //test this with postman
  create(req, res){
    const driverProps = req.body;
    Driver.create(driverProps)
      .then(driver => res.send(driver));
  }
};
