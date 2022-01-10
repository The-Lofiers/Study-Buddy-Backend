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
        createUserNotes(
            notes_ID: Int!,
            url: String!,
            docName: String!
        ): UserNotes!

        editUserNotes(
            url: String,
            docName: String
        ): UserNotes!

        deleteUserNotes(
            id: Int!
        ): Boolean!
`;

const userNotesResolvers = {
    Query: {
        userNotes: (parent, args, context, info) => {
            if (!context.user) {
                // same context used to check if user is logged in
                throw new AuthenticationError(
                    "OOPSIE WOOPSIE UWU you are not authenticated!"
                );
            }
            return context.models.UserNotes.findOne({
                where: {
                    id: args.id,
                },
            });
        },
    },
    Mutation: {
        createUserNotes: (parent, args, context, info) => {
            if (!context.user) {
                // same context used to check if user is logged in
                throw new AuthenticationError(
                    "OOPSIE WOOPSIE UWU you are not authenticated!"
                );
            }
            return context.models.UserNotes.create({
                notes_ID: args.notes_ID,
                url: args.url,
                docName: args.docName,
            });
        },
        editUserNotes: (parent, args, context, info) => {
            if (!context.user) {
                // same context used to check if user is logged in
                throw new AuthenticationError(
                    "OOPSIE WOOPSIE UWU you are not authenticated!"
                );
            }
            return context.models.UserNotes.update(
                {
                    url: args.url,
                    docName: args.docName,
                },
                {
                    where: {
                        id: args.id,
                    },
                }
            );
        },
        deleteUserNotes: (parent, args, context, info) => {
            if (!context.user) {
                // same context used to check if user is logged in
                throw new AuthenticationError(
                    "OOPSIE WOOPSIE UWU you are not authenticated!"
                );
            }
            return context.models.UserNotes.destroy({
                where: {
                    id: args.id,
                },
            });
        },
    },
};

module.exports = { userNotesDef, userNotesResolvers };