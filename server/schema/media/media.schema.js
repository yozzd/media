const {
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean,
} = require('graphql');
const { MediaType, GenType, TotalType } = require('./media.type');
const {
  generateThumbnail,
  generateTree,
  tree,
  total,
} = require('./media.method');


const Query = {
  getTree: {
    type: new GraphQLList(MediaType),
    args: {
      id: { type: GraphQLString },
      sig: { type: GraphQLInt },
      start: { type: GraphQLInt },
      infinite: { type: GraphQLBoolean },
      direction: { type: GraphQLInt },
    },
    resolve: async (p, args) => {
      try {
        const r = await tree(args);
        return r;
      } catch (err) {
        throw err;
      }
    },
  },
  getTotal: {
    type: TotalType,
    args: {
      id: { type: GraphQLString },
    },
    resolve: async (p, args) => {
      try {
        const t = await total(args);
        return t;
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
