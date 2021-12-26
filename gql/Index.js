const graphql = require('graphql')
const RootQuery = require('./User')
const { GraphQLSchema } = graphql

// create a schema
const schema = new GraphQLSchema({
    query: RootQuery,
})

module.export = schema