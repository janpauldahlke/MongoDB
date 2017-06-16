const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;


//subdoc
const PointSchema = new Schema({
  type : {
    type: String,
    default: 'Point'
  },
  coordinates: {
    type : [Number],
    index : '2dsphere'
  }
});

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
  },

  //contemplate!
  //location // LAG // bonus challenge
  //https://docs.mongodb.com/manual/reference/geojson/
  //hamburg 53.5511° N, 9.9937° (LAT/LON format)
  //frankfurt 50.1109° N, 8.6821° E (LAT/LON format)
  //twist it!
  //mongo = x, y axis -> lon lat
  //https://docs.mongodb.com/manual/core/2dsphere/ -> sphere
  // versus https://docs.mongodb.com/manual/core/2d // flat world

  //as subdocument
  geometry : PointSchema
});

const Driver = mongoose.model('driver', DriverSchema);
module.exports = Driver;
