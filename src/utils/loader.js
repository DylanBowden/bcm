const fs = require('fs');
const readline = require('readline');
const Route = require('../entities/Route.class');

module.exports = {
  load: async () => {
    const routes = new Route();
    const fileStream = fs.createReadStream('./resources/routes.csv');
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    delete rl[0];

    for await (const line of rl) {
      const parts = line.replace(/"/g, '').split(',');
      const operatingCompany = parts[1];
      const from = parts[2];
      const to = parts[3];
      const sellingCompanies = parts[4];
      routes.add(operatingCompany, from, to, operatingCompany);

      if (sellingCompanies) {
        for (const sellingCompany of sellingCompanies.split(',')) {
          routes.add(sellingCompany, from, to, operatingCompany);
        }
      }
    }

    return routes;
  }
};
