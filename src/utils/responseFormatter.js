module.exports = {
  format: (searchResults) => {
    const from = searchResults.getFrom();
    const to = searchResults.getTo();
    const sellingAirline = searchResults.getSellingAirline();

    const formatted = [];
    searchResults.getRoutes().forEach(routeSteps => {
      const option = {
        operatingAirline: [],
        sellingAirline,
        from,
        to,
        stopovers: []
      };

      routeSteps.forEach(step => {
        if (step.destination !== from && step.destination !== to) {
          option.stopovers.push(step.destination);
        }
        if (step.operatingCompany && step.operatingCompany !== sellingAirline) {
          option.operatingAirline.push(step.operatingCompany);
        }
      });

      formatted.push(option);
    });

    return formatted;
  }
};
