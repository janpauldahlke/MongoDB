const DriverController = require('../controllers/drivers_controller');

module.exports = (app) => {

  app.get('/', DriverController.index);

  app.get('/api', DriverController.helloWorld);

  app.post('/api/drivers', DriverController.create);

  app.put('/api/drivers/:id', DriverController.edit);

  app.delete('/api/drivers/:id', DriverController.delete);

  app.get('/api/drivers', DriverController.index);
};
