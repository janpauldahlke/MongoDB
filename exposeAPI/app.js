const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

mongoose.Promise = global.Promise;
//catch err missing
mongoose.connect('mongodb://localhost/expose_api');

//TODO create a router - controller - model structure in project and rewrite it
//DONE
//TODO make use of body parser json-object
//DONE
app.use(bodyParser.json());
routes(app);

module.exports = app;
