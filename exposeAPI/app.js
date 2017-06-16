const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

mongoose.Promise = global.Promise;
//catch err missing
//TODO wrap NODE_ENV var
if(process.env !== 'test') {
  mongoose.connect('mongodb://localhost/expose_api');
}
//this is now in testhelper
/*else {
  mongoose.connect('mongodb://localhost/expose_api_test');
}*/


//TODO create a router - controller - model structure in project and rewrite it
//DONE
//TODO make use of body parser json-object
//DONE
app.use(bodyParser.json());
routes(app);

module.exports = app;
