const { gql, UserInputError, AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");

// define the schema, the models, the queries, and the mutations for the graphql server
// string function(int id, string name) -> 
// createClass(className: String!): Class! - >
//similar to cpp returns string 
const classDef = gql`
    type Class {
        class_ID: Int!
        className: String!
        todo_ID: Int!
        notes_ID: Int!
        grades_ID: Int!
    }
    type UserClass {
        ID: Int!
        user_ID: Int!
        className: String!
    }

    type Query {
    }

    type Mutation {
        createClass(
            className: String!
        ): Class!

        editClass(
            class_ID: Int!
            className: String!
        ): Class!

        deleteClass(
            class_ID: Int!
        ): Boolean!

        createUserClass(

    }
`;