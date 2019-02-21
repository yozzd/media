import gql from 'graphql-tag';

export const GET_TREE = gql`
  query getTree($dir: String!) {
    getTree(dir: $dir) {
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
