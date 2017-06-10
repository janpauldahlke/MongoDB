const Artist = require('../models/artist');

/**
 * Finds the lowest and highest age of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max ages, like { min: 16, max: 45 }.
 */
module.exports = () => {
  //find() -> sort() -> limit()
  //Promise.all([]) helper
  const minAge = Artist
    .find({})
    .sort({ age: 1 })
    .limit(1)
    //cause find return array so we need to pull of artists[0]
    .then(artists => artists[0].age);

  const maxAge = Artist
    .find({})
    .sort({ age: -1 })
    .limit(1)
    .then(artists => artists[0].age);

  return Promise.all([minAge, maxAge])
  //resolve into an object
    .then((result) => {
      return {min: result[0], max: result[1]};
    });

};
