const DriverController = require('../controllers/drivers_controller');

module.exports = (app) => {

  app.get('/', DriverController.index);

  app.get('/api', DriverController.helloWorld);

  app.post('/api/drivers', DriverController.create);
};
