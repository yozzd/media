const test = require('ava');
const request = require('supertest');
const { host, port, start } = require('../helpers/serverSetup');

const uri = `http://${host}:${port}`;

test.before(async (t) => {
  await start();
  t.pass();
});

test.serial('get tree', async (t) => {
  const response = await request(uri)
    .post('/graphql')
    .set('Accept', 'application/json')
    .send({
      query: `
      query getTree($id: String, $sig: Int) {
        getTree(id: $id, sig: $sig) {
          route
          base
          thumbnail
          name
          ext
          type
          id
          birthtime
          size
          parentId
          mimeType
          breadcrumb {
            label
            to
          }
          children {
            route
            base
            thumbnail
            name
            ext
            type
            id
            birthtime
            size
            parentId
            mimeType
          }
        }
      }`,
      variables: {
        // id: '',
        id: '98e7cadf-b0c3-3b8e-9dc2-f318aef235c7',
        sig: 0,
      },
    })
    .expect(200);

  const { getTree } = response.body.data;
  t.is(getTree[0].breadcrumb[0], '');
});

test.serial('gen tree', async (t) => {
  const response = await request(uri)
    .post('/graphql')
    .set('Accept', 'application/json')
    .send({
      query: `
      query {
        genTree {
          result
        }
      }`,
    })
    .expect(200);

  const { result } = response.body.data.genTree;
  t.true(result);
});

test.serial('generate thumbnail', async (t) => {
  const response = await request(uri)
    .post('/graphql')
    .set('Accept', 'application/json')
    .send({
      query: `
      query {
        genThumb {
          result
        }
      }`,
    })
    .expect(200);

  const { result } = response.body.data.genThumb;
  t.true(result);
});
