const Artist = require('../models/artist');

/**
 * Deletes a single artist from the Artists collection
 * @param {string} _id - The ID of the artist to delete.
 * @return {promise} A promise that resolves when the record is deleted
 */
module.exports = (_id) => {
  //remove()
  return Artist.remove({_id: _id});

  //carefully with this approach, touches the database twice!
  //condensae whereever you can
  /*return Artist.findById(_id)
    .then((artist) => artist.remove());*/
};
