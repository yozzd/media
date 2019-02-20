const test = require('ava');
const request = require('supertest');
const { host, port, start } = require('../helpers/serverSetup');

const uri = `http://${host}:${port}`;

test.before(async (t) => {
  await start();
  t.pass();
});
