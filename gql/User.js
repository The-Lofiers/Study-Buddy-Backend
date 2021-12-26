const { gql, UserInputError } = require("apollo-server"); // if throws error fix this
const { date } = require("../gql/Date");
const bcrypt = require("bcryptjs"); // encrypt passwords
const { emailValidation, passwordValidation, nameValidation } = require("../helper/validation");

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
    createUser(
      firstname: String!
      lastname: String!
      email: String!
      password: String!
    ): User!
    editUser(
      id: Int!
      firstname: String
      lastname: String
      email: String
      password: String
    ): User!
    deleteUser(id: Int!): User!
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
            // validate the user input
            if (emailValidation(args.email)) {
                throw new UserInputError("Invalid email");
            }
            if (passwordValidation(args.password)) {
                throw new UserInputError("Invalid password");
            }
            if (nameValidation(args.firstname)) {
                throw new UserInputError("Invalid firstname");
            }
            if (nameValidation(args.lastname)) {
                throw new UserInputError("Invalid lastname");
            }
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
        editUser: async (parent, args, context, info) => {
            const user = await context.models.User.findOne({
                where: {
                    id: args.id,
                },
            });
            if (args.firstname) {
                user.firstname = args.firstname;
            }
            if (args.lastname) {
                user.lastname = args.lastname;
            }
            if (args.email) {
                user.email = args.email;
            }
            if (args.password) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(args.password, salt);
                user.password = hashedPassword;
            }
            await user.save();
            return user;
        },
        deleteUser: async (parent, args, context, info) => {
            const user = await context.models.User.findOne({
                where: {
                    id: args.id,
                },
            });
            await user.destroy();
            return user;
        },
    },
};

module.exports = { userDefs, userResolvers };