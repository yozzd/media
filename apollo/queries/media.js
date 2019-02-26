import gql from 'graphql-tag';

export const GET_TREE = gql`
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
  }
`;

export const DIR = gql`
  query getBaseDirectories($directory: String) {
    getBaseDirectories(directory: $directory) {
      directories
    }
  }
`;
