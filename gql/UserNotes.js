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
