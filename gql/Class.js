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

      const userClasses = await context.models.UserClasses.findOne({
        where: {
          user_ID: context.user.id,
        },
      });

      const userClass = await context.models.class.findOne({
        where: {
          id: args.id,
        },
      });

      if (!userClass || !userClasses) {
        throw new UserInputError("No class found");
      }

      if (userClasses.id !== userClass.classes_ID) {
        throw new AuthenticationError(
          "OOPSIE WOOPSIE UWU you are not authorized to access this class!"
        );
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

      const userClasses = await context.models.UserClasses.findOne({
        where: {
          user_ID: context.user.id,
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

      const userClasses = await context.models.UserClasses.findOne({
        where: {
          user_ID: context.user.id,
        },
      });

      if (!userClasses) {
        throw new UserInputError("No classes found");
      }

      if (args.className === "") {
        throw new UserInputError("Class name cannot be empty");
      }

      try {
        return context.models.class.create({
          className: args.className,
          classes_ID: userClasses.id,
        });
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        });
      }
    },
    editClass: (parent, args, context, info) => {
      if (!context.user) {
        // same context used to check if user is logged in
        throw new AuthenticationError(
          "OOPSIE WOOPSIE UWU you are not authenticated!"
        );
      }

      if (args.className === "") {
        throw new UserInputError("Class name cannot be empty");
      }

      const userClasses = await context.models.UserClasses.findOne({
        where: {
          user_ID: context.user.id,
        },
      });

      try {
        return context.models.class.update(
          {
            className: args.className,
            todo_ID: args.todo_ID,
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
    deleteClass: (parent, args, context, info) => {
      if (!context.user) {
        // same context used to check if user is logged in
        throw new AuthenticationError(
          "OOPSIE WOOPSIE UWU you are not authenticated!"
        );
      }

      const userClasses = await context.models.UserClasses.findOne({
        where: {
          user_ID: context.user.id,
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
