module.exports = {
  /**
    * @param searchResults: SearchResults
    * @returns object
    */
  format: (searchResults) => {
    const from = searchResults.getFrom();
    const to = searchResults.getTo();
    const sellingAirline = searchResults.getSellingAirline();
    const formatted = [];

    searchResults.getRoutes().forEach(routeSteps => {
      const option = {
        operatingAirlines: [],
        sellingAirline,
        from,
        to,
        stopOvers: []
      };

      routeSteps.forEach(step => {
        if (step.destination !== from && step.destination !== to) {
          option.stopOvers.push(step.destination);
        }
        if (!step.operatingAirline && !option.operatingAirlines.includes(sellingAirline)) {
          option.operatingAirlines.push(sellingAirline);
        }
        if (step.operatingAirline && !option.operatingAirlines.includes(step.operatingAirline)) {
          option.operatingAirlines.push(step.operatingAirline);
        }
      });

      formatted.push(option);
    });

    return formatted;
  }
};
