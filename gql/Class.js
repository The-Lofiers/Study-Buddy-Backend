const { gql, UserInputError, AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");

// define the schema, the models, the queries, and the mutations for the graphql server
// string function(int id, string name) ->
// createClass(className: String!): Class! - >
// similar to cpp returns string
const classDef = gql`
  scalar Date

  type Class {
    id: Int!
    className: String!
    classes_ID: Int!
    createdAt: Date!
    updatedAt: Date!
  }

  type Query {
    class(id: Int!): Class!
    classes: [Class!]!
  }

  type Mutation {
    createClass(className: String!): Class!

    editClass(className: String): Class!

    deleteClass(id: Int!): Boolean!
  }
`;

const classResolvers = {
  Query: {
    class: async (parent, args, context, info) => {
      if (!context.user) {
        // same context used to check if user is logged in
        throw new AuthenticationError(
          "OOPSIE WOOPSIE UWU you are not authenticated!"
        );
      }

      const userClass = await context.models.class.findOne({
        include: [
          {
            model: context.models.UsersClasses,
            where: {
              user_id: context.user.id,
            },
            required: true,
          },
        ],
        where: {
          id: args.id,
        },
      });

      if (!userClass) {
        throw new UserInputError("No class found");
      }

      return userClass;
    },

    classes: async (parent, args, context, info) => {
      if (!context.user) {
        // same context used to check if user is logged in
        throw new AuthenticationError(
          "OOPSIE WOOPSIE UWU you are not authenticated!"
        );
      }

      const userClasses = await context.models.UsersClasses.findOne({
        where: {
          user_id: context.user.id,
        },
      });

      const userClass = await context.models.class.findAll({
        where: {
          classes_ID: userClasses.id,
        },
      });

      if (!userClasses || !userClass) {
        throw new UserInputError("No classes found");
      }

      return userClass;
    },
  },

  Mutation: {
    createClass: async (parent, args, context, info) => {
      if (!context.user) {
        // same context used to check if user is logged in
        throw new AuthenticationError(
          "OOPSIE WOOPSIE UWU you are not authenticated!"
        );
      }

      const userClasses = await context.models.UsersClasses.findOne({
        where: {
          user_id: context.user.id,
        },
      });

      if (!userClasses) {
        throw new UserInputError("No classes found");
      }

      if (args.className === "") {
        throw new UserInputError("Class name cannot be empty");
      }

      try {
        const userClass = await context.models.class.create({
          className: args.className,
          classes_ID: userClasses.id,
        });

        await context.models.Notes.create({
          class_ID: userClass.id,
        });

        return userClass;
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        });
      }
    },
    editClass: async (parent, args, context, info) => {
      if (!context.user) {
        // same context used to check if user is logged in
        throw new AuthenticationError(
          "OOPSIE WOOPSIE UWU you are not authenticated!"
        );
      }

      if (args.className === "") {
        throw new UserInputError("Class name cannot be empty");
      }

      const userClasses = await context.models.UsersClasses.findOne({
        where: {
          user_id: context.user.id,
        },
      });

      try {
        return context.models.class.update(
          {
            className: args.className,
          },
          {
            where: {
              classes_ID: userClasses.id,
            },
          }
        );
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        });
      }
    },
    deleteClass: async (parent, args, context, info) => {
      if (!context.user) {
        // same context used to check if user is logged in
        throw new AuthenticationError(
          "OOPSIE WOOPSIE UWU you are not authenticated!"
        );
      }

      const userClasses = await context.models.UsersClasses.findOne({
        where: {
          user_id: context.user.id,
        },
      });

      try {
        return context.models.class.destroy({
          where: {
            classes_ID: userClasses.id,
          },
        });
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        });
      }
    },
  },
};

module.exports = { classDef, classResolvers };
