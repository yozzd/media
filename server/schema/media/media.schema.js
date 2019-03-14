const fs = require('fs-extra');
const { GraphQLString, GraphQLList, GraphQLInt } = require('graphql');
const { MediaType, GenType } = require('./media.type');
const { generateThumbnail, generateTree } = require('./media.method');


const Query = {
  getTree: {
    type: new GraphQLList(MediaType),
    args: {
      id: { type: GraphQLString },
      sig: { type: GraphQLInt },
    },
    resolve: async (p, args) => {
      try {
        const dirTree = await fs.readJson('./tools/dirTree.json');
        if (args.id === '' && args.sig === 0) {
          return dirTree.filter(v => v.parentId === args.id);
        } if (args.id && args.sig === 0) {
          return dirTree.filter(v => v.id === args.id);
        }
        const f = dirTree.find(v => v.id === args.id);
        return dirTree.filter(v => v.parentId === f.parentId && v.type === 'file');
      } catch (err) {
        throw err;
      }
    },
  },
  genTree: {
    type: GenType,
    resolve: async () => {
      try {
        const gen = await generateTree();
        return gen;
      } catch (err) {
        throw err;
      }
    },
  },
  genThumb: {
    type: GenType,
    resolve: async () => {
      try {
        const gen = await generateThumbnail();
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
    resolve: () => true,
  },
};

module.exports = {
  Query,
  Mutation,
};
