const { gql, UserInputError, AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");

const toDoDef = gql`
  scalar Date

  type ToDo {
    id: Int!
    todo: String!
    class_ID: Int!
    updatedAt: Date!
    createdAt: Date!
  }

  type Query {
    toDo(id: Int!): ToDo!
  }

  type Mutation {
    createToDo(todo: String!, class_ID: Int!): ToDo!

    editToDo(todo: String): ToDo!

    deleteToDo(id: Int!): Boolean!
  }
`;

const toDoResolvers = {
  Query: {
    toDo: (parent, args, context, info) => {
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
        return context.models.ToDo.findAll({
          where: {
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
    createToDo: (parent, args, context, info) => {
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
        return context.models.ToDo.create({
          toDo: args.todo,
          class_ID: userClass.id,
        });
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        });
      }
    },
    editToDo: (parent, args, context, info) => {
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
        return context.models.ToDo.update(
          {
            toDo: args.todo,
          },
          {
            where: {
              class_ID: userClass.id,
            },
          }
        );
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        });
      }
    },
    deleteToDo: (parent, args, context, info) => {
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
        return context.models.ToDo.destroy({
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
};

module.exports = { toDoDef, toDoResolvers };
