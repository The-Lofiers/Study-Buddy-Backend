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