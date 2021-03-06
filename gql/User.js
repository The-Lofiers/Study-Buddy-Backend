const { gql, UserInputError, AuthenticationError } = require("apollo-server"); // if throws error fix this
const bcrypt = require("bcryptjs"); // encrypt passwords
const {
  emailValidation,
  passwordValidation,
  nameValidation,
} = require("../helper/Validation");
const jwt = require("jsonwebtoken"); // for authentication

// define the schema, the models, the queries, and the mutations for the graphql server
// create user, update user, and delete user
// ! means that the field is required, dont use for editUser
const userDefs = gql`
  scalar Date

  type Tokens {
    token: String!
    refreshToken: String!
  }

  type Custom {
    user: User!
    token: String!
    refreshToken: String!
  }

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
    user(id: Int!): User!
  }
  type Mutation {
    createUser(
      firstname: String!
      lastname: String!
      email: String!
      password: String!
    ): Custom!

    editUser(
      id: Int!
      firstname: String
      lastname: String
      email: String
      password: String
    ): User!

    deleteUser(id: Int!): Boolean!

    login(email: String!, password: String!): Tokens!

    refreshToken(refreshToken: String!): String!
  }
`;

const userResolvers = {
  Query: {
    user: async (parent, args, context, info) => {
      if (!context.user) {
        // same context used to check if user is logged in
        throw new AuthenticationError(
          "OOPSIE WOOPSIE UWU you are not authenticated!"
        );
      }
      const user = await context.models.User.findOne({
        where: {
          id: context.user.id,
        },
      });

      if (!user) {
        throw new UserInputError("User not found");
      }

      return user;
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

      const user = await context.models.User.findOne({
        where: {
          email: args.email,
        },
      });

      if (user) {
        errors.email = "Email already exists";
      }

      if (Object.keys(errors).length > 0) {
        throw new UserInputError("user input errors", { errors });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(args.password.trim(), salt);
      try {
        const user = await context.models.User.create({
          firstname: args.firstname.trim(),
          lastname: args.lastname.trim(),
          email: args.email.trim(),
          password: hashedPassword,
        });

        await context.models.UsersClasses.create({
          user_id: user.id,
        });

        return {
          user: user,
          token: jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "180s",
          }),
          refreshToken: jwt.sign(
            { id: user.id },
            process.env.REFRESH_TOKEN_SECRET,
            {
              expiresIn: "365d",
            }
          ),
        }; // create a token
      } catch (err) {
        throw new Error("Error creating account " + err);
      }
    },
    editUser: async (parent, args, context, info) => {
      if (!context.user) {
        // same context used to check if user is logged in
        throw new AuthenticationError(
          "OOPSIE WOOPSIE UWU you are not authenticated!"
        );
      }

      const user = await context.models.User.findOne({
        where: {
          id: context.user.id,
        },
      });

      if (!user) {
        throw new UserInputError("User not found");
      }

      let errors = {};
      if (args.firstname) {
        if (!nameValidation(args.firstname)) {
          errors.firstname = "Please enter a valid first name";
        } else {
          user.firstname = args.firstname.trim();
        }
      }
      if (args.lastname) {
        if (!nameValidation(args.lastname)) {
          errors.lastname = "Please enter a valid last name";
        } else {
          user.lastname = args.lastname.trim();
        }
      }
      if (args.email) {
        if (!emailValidation(args.email)) {
          errors.email = "Please enter a valid email address";
        } else {
          user.email = args.email.trim();
        }
      }
      if (args.password) {
        if (!passwordValidation(args.password)) {
          errors.password =
            "Please enter a password with at least 8 characters, at least one Uppercase letter, one number, and one special character";
        } else {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(args.password.trim(), salt);
          user.password = hashedPassword;
        }
      }
      if (Object.keys(errors).length > 0) {
        throw new UserInputError("user input errors", { errors });
      }
      await user.save();
      return user;
    },
    deleteUser: async (parent, args, context, info) => {
      if (!context.user) {
        // same context used to check if user is logged in
        throw new AuthenticationError(
          "OOPSIE WOOPSIE UWU you are not authenticated!"
        );
      }

      const user = await context.models.User.findOne({
        where: {
          id: context.user.id,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      await user.destroy();
      return true;
    },
    login: async (parent, args, context, info) => {
      const user = await context.models.User.findOne({
        where: {
          email: args.email,
        },
      });
      if (!user) {
        // if user does not exist
        throw new AuthenticationError("Invalid credentials"); // throw error
      }
      const valid = await bcrypt.compare(args.password, user.password); // compare the password
      if (!valid) {
        throw new AuthenticationError("Invalid credentials"); // throw error
      }
      return {
        token: jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: "365d",
        }),
        refreshToken: jwt.sign(
          { id: user.id },
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: "365d",
          }
        ),
      }; // create a token
    },
    refreshToken: async (parent, args, context, info) => {
      const { id } = jwt.verify(
        args.refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );

      if (!id) {
        throw new AuthenticationError("Invalid refresh token");
      }

      const user = await context.models.User.findOne({
        where: {
          email: args.email,
        },
      });
      if (!user) {
        // if user does not exist
        throw new AuthenticationError("Invalid credentials"); // throw error
      }
      return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "180s",
      });
    },
  },
};

module.exports = { userDefs, userResolvers };
