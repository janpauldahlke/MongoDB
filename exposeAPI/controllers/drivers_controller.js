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
  create(req, res, next){
    const driverProps = req.body;

    Driver.create(driverProps)
      .then(driver => res.send(driver))
      //added next to force next middleware // express error handling
      .catch(next);
  },

  edit(req, res, next) {
    //what to update
    const driverId = req.params.id;
    //where to update
    const driverProps = req.body;
    //downside of findByIdAndUpdate is in callback that is not != driver
    Driver.findByIdAndUpdate( { _id: driverId}, driverProps)
      .then(() => Driver.findById({  _id: driverId })) //return driver
      .then(driver => res.send(driver)) //
      .catch(next);
  },

  delete(req, res, next) {

  }
};
