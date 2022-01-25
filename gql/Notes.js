const { gql, UserInputError, AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");

const notesDef = gql`
  scalar Date
  type Notes {
    id: Int!
    class_ID: Int!
    updatedAt: Date!
    createdAt: Date!
  }
  type Query {
    notes(id: Int!): Notes!
  }
  type Mutation {
    createNotes(class_ID: Int!): Notes!
    deleteNotes(id: Int!): Boolean!
  }
`;

const notesResolvers = {
  Query: {
    notes: (parent, args, context, info) => {
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

      const userClass = await context.models.class.findOne({
        where: {
          classes_ID: userClasses.id,
        },
      });

      try {
        return context.models.Notes.findOne({
          where: {
            id: args.id,
            class_ID: userClass.id,
          },
        });
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        });
      }
    },
  },
  Mutation: {
    deleteNotes: (parent, args, context, info) => {
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

      const userClass = await context.models.class.findOne({
        where: {
          classes_ID: userClasses.id,
        },
      });

      return context.models.Notes.destroy({
        where: {
          id: args.id,
          class_ID: userClass.id,
        },
      });
    },
  },
};

module.exports = { notesDef, notesResolvers };
