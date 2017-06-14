const path = require('path');
var appDir = path.dirname(require.main.filename);
const Driver = require('../models/driver');

module.exports = {

  index(req, res) {
    res.sendFile('index.html', {"root": appDir});
  },

  helloWorld(req, res) {
    res.send( { hello : 'world' } );
  },

  //! implement npm body-parser
  create(req, res){
    console.log(req.body);
  }
};
