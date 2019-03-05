const { GraphQLString } = require('graphql');
const _ = require('lodash');
const dirTree = require('directory-tree');
const fm = require('file-matcher');
const { MediaType, GenType } = require('./media.type');
const { gThumb } = require('./media.method');

const fileMatcher = new fm.FileMatcher();
const base = 'static/media';

const Query = {
  getTree: {
    type: MediaType,
    args: {
      path: { type: GraphQLString },
    },
    resolve: async (parent, args) => {
      try {
        const s = await fileMatcher.find({
          // path: `/media/data3/media/media/${base}`,
          path: `/home/media/${base}`,
          recursiveSearch: true,
          fileFilter: {
            fileNamePattern: `**${args.path}*`,
          },
        });
        // const path = !args.path ? base : !s.length ? base + args.path : _.join(_.drop(_.split(s[0], '/', 12), 5), '/');
        const path = !args.path ? base : !s.length ? base + args.path : _.join(_.drop(_.split(s[0], '/', 12), 3), '/');
        const tree = await dirTree(path);
        return tree;
      } catch (err) {
        throw err;
      }
    },
  },
  genThumb: {
    type: GenType,
    resolve: async () => {
      try {
        const gen = await gThumb();
        return gen;
      } catch (err) {
        throw err;
      }
    },
  },
};

const Mutation = {
  createDir: {
    type: MediaType,
    args: {
      dirName: { type: GraphQLString },
    },
    resolve: async () => {
      try {
        return true;
      } catch (err) {
        throw err;
      }
    },
  },
};

module.exports = {
  Query,
  Mutation,
};
