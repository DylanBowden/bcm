const express = require('express');
require('dotenv').config();

const validator = require('./src/utils/requestValidator');
const pathFinder = require('./src/utils/pathFinder');
const responseFormatter = require('./src/utils/responseFormatter');
const loader = require('./src/utils/loader');

const app = express();
const port = 8080;

let routes;

app.get('/api/routes/:airlineCode/:from/:to', (req, res) => {
  try {
    validator.validateBody(req);
    const searchResults = pathFinder.find(
      routes,
      req.params.airlineCode,
      req.params.from,
      req.params.to,
      process.env.MAX_STOPOVERS
    );
    const response = responseFormatter.format(searchResults);
    res.json(response);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

const server = app.listen(port, async () => {
  routes = await loader.load(process.env.ROUTE_LIST);
  console.log(`listening on port ${port}!`);
});

module.exports = {
  app,
  server
};
