const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/routes');

//TODO create a router - controller - model structure in project and rewrite it
//DONE
//TODO make use of body parser json-object
//DONE
app.use(bodyParser.json());
routes(app);

module.exports = app;
