const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
  title: String,
  date: Date,  // https://docs.mongodb.com/manual/reference/method/Date/
  copiesSold: Number,
  numberTracks: Number,
  image: String,
  revenue: Number //currency
});

//only schema due subdocument
module.exports = AlbumSchema;
