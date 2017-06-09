
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AlbumSchema = require('./album');

const ArtistSchema = new Schema({

  name: String,
  age: Number,  //date is better here because increment
  yearsActive: Number, // -"- Date()
  image: String,
  genre: String,
  website: String,
  netWorth: Number, //currency
  labelName: String,
  retired: Boolean,
  //subdocument album here
  albums: [AlbumSchema]
});

const Artist = mongoose.model('artist', ArtistSchema);
module.exports = Artist;
