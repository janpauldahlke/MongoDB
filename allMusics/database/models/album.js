const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
  title: String,
  date: String,
  copiesSold: Number,
  numberTracks: Number,
  image: String,
  revenue: Number
});

const Album = mongoose.Schema('album', AlbumSchema);
module.exports = Album;
