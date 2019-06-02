const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const validator = require('./src/utils/requestValidator');
const pathFinder = require('./src/utils/pathFinder');
const responseFormatter = require('./src/utils/responseFormatter');
const loader = require('./src/utils/loader');

const app = express();
const port = 8080;
app.use(bodyParser.json());

app.get('/api/routes/:airlineCode/:from/:to', async (req, res) => {
  console.log(req.params);

  try {
    validator.validateBody(req);
    const searchResults = pathFinder.find(
      await loader.load(),
      req.params.airlineCode,
      req.params.from,
      req.params.to,
      process.env.MAX_STOPOVERS
    );
    const response = responseFormatter.format(searchResults);
    res.json(response);
  } catch (err) {
    res.send(400, err.message);
  }
});

const init = app.listen(port, async () => {
  await loader.load();
  console.log(`listening on port ${port}!`);
});

module.exports = {
  app,
  init
};
