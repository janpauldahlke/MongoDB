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


  create(req, res){
    //why is this console log NULL or empty?

    console.log(req.body);
    res.send({body : 'logga'});

  }
};
