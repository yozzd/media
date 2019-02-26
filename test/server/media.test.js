const test = require('ava');
const request = require('supertest');
const { host, port, start } = require('../helpers/serverSetup');

const uri = `http://${host}:${port}`;

test.before(async (t) => {
  await start();
  t.pass();
});

test.serial('get directory tree', async (t) => {
  const response = await request(uri)
    .post('/graphql')
    .set('Accept', 'application/json')
    .send({
      query: `
      query getTree($path: String) {
        getTree(path: $path) {
          path
          name
          size
          extension
          type
          children {
            path
            name
            size
            extension
            type
          }
        }
      }`,
      variables: {
        // path: null,
        // path: '/SPECIAL_EVENTS/Test',
        // path: '/SPECIAL_EVENTS/wp',
        path: '/SPECIAL_EVENTS/Test/Test/wp',
      },
    })
    .expect(200);

  const { getTree } = response.body.data;
  t.is(getTree, '');
});
