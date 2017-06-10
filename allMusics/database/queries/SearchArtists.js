const Artist = require('../models/artist');

/**
 * Searches through the Artist collection
 * @param {object} criteria An object with a name, age, and yearsActive
 * @param {string} sortProperty The property to sort the results by
 * @param {integer} offset How many records to skip in the result set
 * @param {integer} limit How many records to return in the result set
 * @return {promise} A promise that resolves with the artists, count, offset, and limit
 * like this : { all : [artists] count : count, offset : offset, limit : limit }
 */
module.exports = (criteria, sortProperty, offset = 0, limit = 20) => {
  //TODO query that will sort, offset, limit options
  /*const sortOrder = {};
  sortOrder[sortProperty] = 1;*/


  const query = Artist.find({})
    //if case of properties //ES6 interpolated property compare ES5 above
    .sort({ [sortProperty] : 1  })
    .skip(offset)
    .limit(limit);
    
};
