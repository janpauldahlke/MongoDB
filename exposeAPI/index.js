const app = require('./app');
const port = 1337;

app.listen(port, () => {
  console.log('running on ', port)
});
