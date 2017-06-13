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

  const query = Artist.find(buildQuery(criteria))
    //if case of properties //ES6 interpolated property compare ES5 approach above
    .sort({ [sortProperty] : 1  })
    .skip(offset)
    .limit(limit);

  return Promise.all([query, Artist.count()])
      .then((results) => {
        return {
          all : results[0],
          count : results[1],
          offset : offset,
          limit : limit
        };
      });

  //TODO add filter criteria //sidebar element GetAgeRange.js || GetYearsActiveRange.js
  //refactor find(const buildQuery())

};

const buildQuery = (criteria) => {
  const query = {};

  //https://docs.mongodb.com/manual/reference/operator/query/text/
  //!! use mongoSHell to create an index like below
  //https://docs.mongodb.com/manual/indexes/
  //indexes are supported only on one field atm in mongo!!
  /* on mongo shell use upstar_music
  > db.artists.createIndex({name: "text"})
    {
    	"createdCollectionAutomatically" : true,
    	"numIndexesBefore" : 1,
    	"numIndexesAfter" : 2,
    	"ok" : 1
    }
  */
  if(criteria.name) {
    query.$text = { $search : criteria.name};
  }

  if(criteria.age) {
    //https://docs.mongodb.com/manual/reference/operator/query-modifier/
    query.age = {
      $gte : criteria.age.min,
      $lte : criteria.age.max
    }
  }
  if(criteria.yearsActive) {
    query.yearsActive = {
      $gte : criteria.yearsActive.min,
      $lte : criteria.yearsActive.max
    }
  }

  return query;
};
