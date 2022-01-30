const { gql, UserInputError, AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");

const userNotesDef = gql`
  scalar Date

  type UserNotes {
    id: Int!
    notes_ID: Int!
    url: String!
    docName: String!
    updatedAt: Date!
    createdAt: Date!
  }

  type Query {
    userNotes(id: Int!): UserNotes!
  }

  type Mutation {
    createUserNotes(notes_ID: Int!, url: String!, docName: String!): UserNotes!

    editUserNotes(url: String, docName: String): UserNotes!

    deleteUserNotes(id: Int!): Boolean!
  }
`;

const userNotesResolvers = {
  Query: {
    userNotes: async (parent, args, context, info) => {
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

      const notes = await context.models.Notes.findOne({
        where: {
          class_ID: userClass.id,
        },
      });

      try {
        return context.models.UserNotes.findOne({
          where: {
            notes_ID: notes.id,
          },
        });
      } catch (err) {
        throw new UserInputError(err);
      }
    },
  },
  Mutation: {
    createUserNotes: async (parent, args, context, info) => {
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

      const notes = await context.models.Notes.findOne({
        where: {
          class_ID: userClass.id,
        },
      });

      try {
        return context.models.UserNotes.create({
          notes_ID: notes.id,
          url: args.url,
          docName: args.docName,
        });
      } catch (err) {
        throw new UserInputError(err);
      }
    },
    editUserNotes: async (parent, args, context, info) => {
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

      const notes = await context.models.Notes.findOne({
        where: {
          class_ID: userClass.id,
        },
      });

      try {
        return context.models.UserNotes.update(
          {
            url: args.url,
            docName: args.docName,
          },
          {
            where: {
              notes_ID: notes.id,
              id: args.id,
            },
          }
        );
      } catch (err) {
        throw new UserInputError(err);
      }
    },
    deleteUserNotes: async (parent, args, context, info) => {
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

      const notes = await context.models.Notes.findOne({
        where: {
          class_ID: userClass.id,
        },
      });

      try {
        return context.models.UserNotes.destroy({
          where: {
            notes_ID: notes.id,
            id: args.id,
          },
        });
      } catch (err) {
        throw new UserInputError(err);
      }
    },
  },
};

module.exports = { userNotesDef, userNotesResolvers };
