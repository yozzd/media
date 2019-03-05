const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLFloat,
  GraphQLBoolean,
} = require('graphql');

const ChildrenType = new GraphQLObjectType({
  name: 'ChildrenType',
  fields: () => ({
    path: { type: GraphQLString },
    name: { type: GraphQLString },
    size: { type: GraphQLFloat },
    extension: { type: GraphQLString },
    type: { type: GraphQLString },
  }),
});

const MediaType = new GraphQLObjectType({
  name: 'MediaType',
  fields: () => ({
    path: { type: GraphQLString },
    name: { type: GraphQLString },
    size: { type: GraphQLFloat },
    extension: { type: GraphQLString },
    type: { type: GraphQLString },
    children: { type: new GraphQLList(ChildrenType) },
  }),
});

const GenType = new GraphQLObjectType({
  name: 'GenType',
  fields: () => ({
    result: { type: GraphQLBoolean },
  }),
});

module.exports = {
  MediaType,
  GenType,
};
