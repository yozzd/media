const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('../../server/schema');

const app = express();

const host = '0.0.0.0';
const port = 3001;

const setup = {
  host,
  port,
  start: async () => {
    app.use(
      '/graphql',
      graphqlHTTP((req, res, params) => ({
        schema,
        context: { req, res, params },
      })),
    );

    await app.listen(port, host);
  },
};

module.exports = setup;
