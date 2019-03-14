import gql from 'graphql-tag';

const GET_TREE = gql`
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
  }
`;

export default GET_TREE;
