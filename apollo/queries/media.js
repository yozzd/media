import gql from 'graphql-tag';

export const GET_TREE = gql`
  query getTree(
    $id: String
    $sig: Int
    $start: Int
    $infinite: Boolean
    $direction: Int
  ) {
    getTree(
      id: $id
      sig: $sig
      start: $start
      infinite: $infinite
      direction: $direction
    ) {
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

export const GET_TOTAL = gql`
  query getTotal($id: String) {
    getTotal(id: $id) {
      total
    }
  }
`;
