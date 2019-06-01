const express = require('express');
const bodyParser = require('body-parser');

const validator = require('./src/requestValidator');
const pathFinder = require('./src/pathFinder');
const responseFormatter = require('./src/responseFormatter');

const app = express();
const port = 8080;
app.use(bodyParser.json());

app.get('/api/routes/:airlineCode/:from/:to', (req, res) => {
  try {
    validator.validateBody(req);
    const results = pathFinder.find(req.params.airlineCode, req.params.from, req.params.to)
    const response = responseFormatter.format(results);
    res.json({ response });
  } catch (err) {
    res.sendStatus(400);
  }
});

const server = app.listen(port, () => console.log(`listening on port ${port}!`));

module.exports = {
  app,
  server
};
