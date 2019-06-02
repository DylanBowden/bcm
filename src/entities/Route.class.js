class Route {
  constructor () {
    this.routes = {};
  }

  add (sellingAirline, from, destination, operatingAirline) {
    this.routes[sellingAirline] = this.routes[sellingAirline] || [];
    this.routes[sellingAirline][from] = this.routes[sellingAirline][from] || [];
    this.routes[sellingAirline][from].push({ destination, operatingAirline });
  }

  getDestinationList (sellingAirline, departure) {
    if (!this.routes[sellingAirline]) {
      return [];
    }

    return this.routes[sellingAirline][departure];
  }
}

module.exports = Route;
