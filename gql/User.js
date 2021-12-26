const { gql } = require("apollo-server"); // if throws error fix this
const { date } = require("../gql/Date");
const bcrypt = require('bcryptjs'); // encrypt passwords

// define the schema, the models, the queries, and the mutations for the graphql server
// create user, update user, and delete user
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
  type Mutation {
    createUser(firstname: String!, lastname: String!, email: String!, password: String!): User!
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

    Mutation: {
        createUser: async (parent, args, context, info) => { 
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(args.password, salt);
            const user = await context.models.User.create({
                firstname: args.firstname,
                lastname: args.lastname,
                email: args.email,
                password: hashedPassword,
            });
            return user;
        },
    },
};

module.exports = { userDefs, userResolvers };
