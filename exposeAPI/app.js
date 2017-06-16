const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

mongoose.Promise = global.Promise;
//catch err missing
//TODO wrap NODE_ENV var
if( process.env !== 'test' ) {
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
//error handling middleware
//err = depends on prev middleware err
//req = request obj
//res = response obj
//next = is a function!! call it to force to goto next middleware
app.use((err, req, res, next) => {
  console.log(err);
});

module.exports = app;
