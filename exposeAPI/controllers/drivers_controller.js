const path = require('path');
const appDir = path.dirname(require.main.filename);
const Driver = require('../models/driver');



module.exports = {
  //TODO rewrite into location
  //https://docs.mongodb.com/manual/reference/command/geoNear/
  index(req, res, next) {
    const { lng, lat } = req.query; //query string from URL http://foo.com?lng=500&lat200 example

    Driver.geoNear(
      //express pulls out string of lat and long declaration
      { type: 'Point', coordinates : [parseFloat(lng), parseFloat(lng)] },
      { spherical : true, maxDistance/*in meters*/: 50000 }
    )
    .then(driver => { res.send(driver)} )
    .catch(next);
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
//what to update
    const driverId = req.params.id;
    //where to update
    const driverProps = req.body;

    Driver
    //http://mongoosejs.com/docs/api.html#model_Model.findByIdAndRemove
      .findOneAndRemove({ _id : driverId}, driverProps)
      .then(() => Driver.findById({ _id : driverId}))
      .then(driver => res.status(204).send(driver))
      .catch(next);
    }
};
