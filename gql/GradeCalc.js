const { gql, UserInputError, AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");

const classDef = gql`
    scalar Date

    Type GradeCalc {
        id: Int!,
        assignment: String!,
        weight: Int!,
        inputGrade: Int!,
        average: Int!,
        class_ID: Int!,
        updatedAt: Date!,
        createdAt: Date!
    }

    type Query {
        gradeCalc(id: Int!): GradeCalc!
    }

    type Mutation {
        createGradeCalc(
            class_ID: Int!
        ): GradeCalc!

        editGradeCalc(
            weight: Int,
            inputGrade: Int,
            average: Int,
            assignment: String,
        ): GradeCalc!

        deleteGradeCalc(
            id: Int!
        ): Boolean!
`;

