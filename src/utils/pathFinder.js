const _ = require('lodash');
const SearchResults = require('../entities/SearchResults.class');

module.exports = {

  /**
    * @param routes: Route
    * @param sellingAirline: string
    * @param from: string
    * @param to: string
    * @param maxLength: int
    * @returns SearchResults
    */
  find: (routes, sellingAirline, from, to, maxLength = 4) => {
    const searchResults = new SearchResults(sellingAirline, from, to);

    // for each destination, we explore every branch possibility- recursively- until
    // the next node is either equal to our final destination or the length of the branch is too long.
    function recursivePathFind (path) {
      const lastStopOver = _.last(path);
      const destinations = routes.getDestinationList(sellingAirline, lastStopOver.destination);

      if (destinations) {
        destinations.forEach((destination) => {
          const newPath = _.clone(path);
          newPath.push(destination);

          if (destination.destination === to) {
            searchResults.add(newPath);
          } else if (path.length < maxLength) {
            recursivePathFind(newPath);
          }
        });
      }
    }

    const path = [{ destination: from, operatingAirline: null }];
    recursivePathFind(path);

    return searchResults;
  }
};
