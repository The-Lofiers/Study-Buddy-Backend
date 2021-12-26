const { gql, UserInputError, AuthenticationError, ForbiddenError } = require("apollo-server"); // if throws error fix this
const bcrypt = require("bcryptjs"); // encrypt passwords
const { emailValidation, passwordValidation, nameValidation } = require("../helper/validation");
const jwt = require('jsonwebtoken'); // for authentication

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
    ): String!
    editUser(
      id: Int!
      firstname: String
      lastname: String
      email: String
      password: String
    ): User!
    deleteUser(id: Int!): User!

    login(email: String!, password: String!): String!
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
            let errors = {};
            // validate the user input
            if (!emailValidation(args.email)) {
                errors.email = "Please enter a valid email address";
            }
            if (!passwordValidation(args.password)) {
                errors.password =
                    "Please enter a password with at least 8 characters, at least one Uppercase letter, one number, and one special character";
            }
            if (!nameValidation(args.firstname)) {
                errors.firstname = "Please enter a valid first name";
            }
            if (!nameValidation(args.lastname)) {
                errors.lastname = "Please enter a valid last name";
            }
            if (Object.keys(errors).length > 0) {
                throw new UserInputError("user input errors", { errors });
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(args.password, salt);
            try {
                const user = await context.models.User.create({
                    firstname: args.firstname,
                    lastname: args.lastname,
                    email: args.email,
                    password: hashedPassword,
                });
                return jwt.sign({ id: user._id }, process.env.JWT_SECRET); // create a token
            }
            catch (err) {
                throw new Error('Error creating account');
            }
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
        login: async (parent, args, context, info) => {
            const user = await context.models.User.findOne({
                where: {
                    email: args.email,
                },
            });
            if (!user) { // if user does not exist
                throw new AuthenticationError("Invalid credentials"); // throw error
            }
            const valid = await bcrypt.compare(args.password, user.password); // compare the password
            if (!valid) {
                throw new AuthenticationError("Invalid credentials"); // throw error
            }
            return jwt.sign({ id: user._id }, process.env.JWT_SECRET); // create a token
        },
    },
};

module.exports = { userDefs, userResolvers };