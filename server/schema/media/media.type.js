const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLInt,
} = require('graphql');
const { GraphQLDateTime } = require('graphql-iso-date');
const { gTree } = require('./media.method.js');

const ChildrenType = new GraphQLObjectType({
  name: 'ChildrenType',
  fields: () => ({
    route: { type: GraphQLString },
    base: { type: GraphQLString },
    thumbnail: { type: GraphQLString },
    name: { type: GraphQLString },
    ext: { type: GraphQLString },
    type: { type: GraphQLString },
    id: { type: GraphQLString },
    birthtime: { type: GraphQLDateTime },
    size: { type: GraphQLFloat },
    parentId: { type: GraphQLString },
    mimeType: { type: GraphQLString },
  }),
});

const BreadcrumbType = new GraphQLObjectType({
  name: 'BreadcrumbType',
  fields: () => ({
    label: { type: GraphQLString },
    to: { type: GraphQLString },
  }),
});

const MediaType = new GraphQLObjectType({
  name: 'MediaType',
  fields: () => ({
    route: { type: GraphQLString },
    base: { type: GraphQLString },
    thumbnail: { type: GraphQLString },
    name: { type: GraphQLString },
    ext: { type: GraphQLString },
    type: { type: GraphQLString },
    id: { type: GraphQLString },
    birthtime: { type: GraphQLDateTime },
    size: { type: GraphQLFloat },
    parentId: { type: GraphQLString },
    mimeType: { type: GraphQLString },
    breadcrumb: { type: new GraphQLList(BreadcrumbType) },
    children: {
      type: new GraphQLList(ChildrenType),
      resolve: async (p) => {
        const dirTree = await gTree();
        if (p.type === 'file') {
          return [];
        }
        return dirTree.filter(v => v.parentId === p.id);
      },
    },
  }),
});

const GenType = new GraphQLObjectType({
  name: 'GenType',
  fields: () => ({
    result: { type: GraphQLBoolean },
  }),
});

const TotalType = new GraphQLObjectType({
  name: 'TotalType',
  fields: () => ({
    total: { type: GraphQLInt },
  }),
});

module.exports = {
  MediaType,
  GenType,
  TotalType,
};
