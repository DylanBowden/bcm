const _ = require('lodash');

class SearchResults {
  constructor (sellingAirline, from, to) {
    this.results = [];
    this.sellingAirline = sellingAirline;
    this.from = from;
    this.to = to;
  }

  /**
  * @param path: [{ destination: string, operatingAirline: stri`ng }, ...]
  */
  add (path) {
    const allDestinations = path.map(a => a.destination);
    const uniqueDestinations = _.uniq(allDestinations);
    if (uniqueDestinations.length === allDestinations.length) {
      this.results.push(path);
    }
  }

  getRoutes () {
    return this.results;
  }

  getSellingAirline () {
    return this.sellingAirline;
  }

  getFrom () {
    return this.from;
  }

  getTo () {
    return this.to;
  }
}

module.exports = SearchResults;
