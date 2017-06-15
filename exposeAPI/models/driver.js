const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DriverSchema = new Schema({
  name: {
    type: String,
    required : true
  },
  email : {
    type: String,
    required : true
  },
  driving : {
    type: Boolean,
    default: false
  }
  //location // LAG
});

const Driver = mongoose.model('driver', DriverSchema);
module.exports = Driver;
