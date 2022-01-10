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
        todo_ID: Int!
        notes_ID: Int!
        user_ID: Int!
        grade_ID: Int!
        createdAt: Date!
        updatedAt: Date!
    }

    type Query {
        class(id: Int!): Class!
        classes: [Class!]!
    }

    type Mutation {
        createClass(
            className: String!
            notes_ID: Int!
            grades_ID: Int!
        ): Class!

        editClass(
            className: String
            todo_ID: Int
        ): Class!

        deleteClass(
            id: Int!
        ): Boolean!

    }
`;


const classResolvers = {
    // class(id: Int!): Class!
    // classes: [Class!]!
    // userClasses: [UserClass!]!
    // userClass(id: Int!): UserClass!
    // userClass(class_ID: Int!): [Class!]!

    Query: {
        class: (parent, args, context, info) => {
            if (!context.user) {
                // same context used to check if user is logged in
                throw new AuthenticationError(
                    "OOPSIE WOOPSIE UWU you are not authenticated!"
                );
            }
            return context.models.Class.findOne({
                where: {
                    id: args.id,
                },
            });
        },

        classes: (parent, args, context, info) => {
            if (!context.user) {
                // same context used to check if user is logged in
                throw new AuthenticationError(
                    "OOPSIE WOOPSIE UWU you are not authenticated!"
                );
            }
            return context.models.Class.findAll({
                where: {

                }
            });
        },


        // // return user_ID from UserClass table
        // userClass: (parent, args, context, info) => {
        //     if (!context.user) {
        //         // same context used to check if user is logged in
        //         throw new AuthenticationError(
        //             "OOPSIE WOOPSIE UWU you are not authenticated!"
        //         );
        //     }
        //     return context.models.UserClass.findOne({
        //         where: {
        //             user_ID: args.user_ID,
        //         },
        //     });
        // },

    },

    Mutation: {
        createClass: (parent, args, context, info) => {
            if (!context.user) {
                // same context used to check if user is logged in
                throw new AuthenticationError(
                    "OOPSIE WOOPSIE UWU you are not authenticated!"
                );
            }
            return context.models.Class.create({
                className: args.className,
                notes_ID: args.notes_ID,
                grade_ID: args.grade_ID,
                user_ID: context.user.id,
            });
        },
        editClass: (parent, args, context, info) => {
            if (!context.user) {
                // same context used to check if user is logged in
                throw new AuthenticationError(
                    "OOPSIE WOOPSIE UWU you are not authenticated!"
                );
            }
            return context.models.Class.update(
                {
                    className: args.className,
                    todo_ID: args.todo_ID,
                },
                {
                    where: {
                        id: args.id,
                    },
                }
            );
        },
        deleteClass: (parent, args, context, info) => {
            if (!context.user) {
                // same context used to check if user is logged in
                throw new AuthenticationError(
                    "OOPSIE WOOPSIE UWU you are not authenticated!"
                );
            }
            return context.models.Class.destroy({
                where: {
                    id: args.id,
                },
            });
        },
    },
};

module.exports = { classDef, classResolvers };