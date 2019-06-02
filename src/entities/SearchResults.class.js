const _ = require('lodash');

class SearchResults {
  constructor (sellingAirline, from, to) {
    this.results = [];
    this.sellingAirline = sellingAirline;
    this.from = from;
    this.to = to;
  }

  add (path) {
    if (_.uniq(path).length === path.length) {
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
