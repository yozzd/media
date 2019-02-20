const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const _ = require('lodash');
const Media = require('./media/media.schema');

const query = new GraphQLObjectType({
    name: 'Query',
    fields: _.merge(Media.Query),
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: _.merge(Media.Mutation),
});

module.exports = new GraphQLSchema({
    query,
    mutation,
});
