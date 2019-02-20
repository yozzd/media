const express = require('express');
const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');
const graphqlHTTP = require('express-graphql');
const { maskErrors } = require('graphql-errors');
const schema = require('./schema');

const app = express();
maskErrors(schema);

const config = require('../nuxt.config.js');

config.dev = !(process.env.NODE_ENV === 'production');

app.use(
  '/graphql',
  graphqlHTTP((req, res, params) => ({
    schema,
    context: { req, res, params },
    graphiql: process.env.NODE_ENV !== 'production',
  })),
);

const start = async () => {
  const nuxt = new Nuxt(config);

  const {
    host = process.env.HOST || '0.0.0.0',
    port = process.env.PORT || 3000,
  } = nuxt.options.server;

  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  app.use(nuxt.render);

  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true,
  });
};
start();
