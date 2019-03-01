const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLFloat,
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

module.exports = {
  MediaType,
};
