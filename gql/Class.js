const { gql, UserInputError, AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");

// define the schema, the models, the queries, and the mutations for the graphql server
// string function(int id, string name) -> 
// createClass(className: String!): Class! - >
//similar to cpp returns string 
const classDef = gql`
    scalar Date

    type Class {
        id: Int!
        className: String!
        todo_ID: Int!
        notes_ID: Int!
        grades_ID: Int!
        createdAt: Date!
        updatedAt: Date!
    }
    type UserClass {
        id: Int!
        user_ID: Int!
        createdAt: Date!
        updatedAt: Date!
    }

    type Query {
        class(id: Int!): Class!
        classes: [Class!]!
        userClasses: [UserClass!]!
        userClass(id: Int!): UserClass!
    }

    type Mutation {
        createClass(
            className: String!
            todo_ID: Int!
            notes_ID: Int!
            grades_ID: Int!
        ): Class!

        editClass(
            class_ID: Int!
            className: String!
            todo_ID: Int!
            notes_ID: Int!
            grades_ID: Int!
        ): Class!

        deleteClass(
            class_ID: Int!
        ): Boolean!

        createUserClass(
            user_ID: Int!
        ): UserClass!

        deleteUserClass(
            class_ID: Int!
        ): Boolean!
    }
`;

