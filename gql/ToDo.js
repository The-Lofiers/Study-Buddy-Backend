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
        createToDo(
            todo: String!
            class_ID: Int!
        ): ToDo!
        
        editToDo(
            todo: String
        ): ToDo!

        deleteToDo(
            id: Int!
        ): Boolean!
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
            return context.models.ToDo.findOne({
                where: {
                    id: args.id,
                },
            });
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
            return context.models.ToDo.create({
                toDo: args.todo,
                class_ID: args.class_ID,
            });
        },
        editToDo: (parent, args, context, info) => {
            if (!context.user) {
                // same context used to check if user is logged in
                throw new AuthenticationError(
                    "OOPSIE WOOPSIE UWU you are not authenticated!"
                );
            }
            return context.models.ToDo.update({
                toDo: args.todo,
            });
        },
        deleteToDo: (parent, args, context, info) => {
            if (!context.user) {
                // same context used to check if user is logged in
                throw new AuthenticationError(
                    "OOPSIE WOOPSIE UWU you are not authenticated!"
                );
            }
            return context.models.ToDo.destroy({
                where: {
                    id: args.id,
                },
            });
        },
    },
};

module.exports = { toDoDef, toDoResolvers };