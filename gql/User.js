const { gql } = require("apollo-server"); // if throws error fix this
const { date } = require("../gql/Date");

const userDefs = gql`
  scalar Date
  type User {
    id: Int!
    firstname: String!
    lastname: String!
    email: String!
    password: String!
    createdAt: Date!
    updatedAt: Date!
  }

  type Query {
    user(id: Int!): User
  }
`;

const userResolvers = {
  Query: {
    user: (parent, args, context, info) => {
      return context.models.User.findOne({
        where: {
          id: args.id,
        },
      });
    },
  },
};

module.exports = { userDefs, userResolvers };
