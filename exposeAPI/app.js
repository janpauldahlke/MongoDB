const express = require('express');
const app = express();

const routes = require('./routes/routes');

//TODO create a router - controller - model structure in project and rewrite it
routes(app);

module.exports = app;
