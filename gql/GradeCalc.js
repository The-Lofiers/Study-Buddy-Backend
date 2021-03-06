const { gql, UserInputError, AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");

const gradeCalcDef = gql`
  scalar Date

  type GradeCalc {
    id: Int!
    assignment: String!
    weight: Int!
    inputGrade: Int!
    average: Int!
    class_ID: Int!
    updatedAt: Date!
    createdAt: Date!
  }

  type Query {
    gradeCalc(id: Int!): GradeCalc!
  }

  type Mutation {
    createGradeCalc(class_ID: Int!): GradeCalc!

    editGradeCalc(
      weight: Int
      inputGrade: Int
      average: Int
      assignment: String
    ): GradeCalc!

    deleteGradeCalc(id: Int!): Boolean!
  }
`;

const gradeCalcResolvers = {
  Query: {
    gradeCalc: async (parent, args, context, info) => {
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
        return context.models.GradeCalc.findOne({
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
    createGradeCalc: async (parent, args, context, info) => {
      if (!context.user) {
        // same context used to check if user is logged in
        throw new AuthenticationError(
          "OOPSIE WOOPSIE UWU you are not authenticated!"
        );
      }

      return context.models.GradeCalc.create({
        class_ID: args.class_ID,
      });
    },
    editGradeCalc: async (parent, args, context, info) => {
      if (!context.user) {
        // same context used to check if user is logged in
        throw new AuthenticationError(
          "OOPSIE WOOPSIE UWU you are not authenticated!"
        );
      }

      return context.models.GradeCalc.update(
        {
          weight: args.weight,
          inputGrade: args.inputGrade,
          average: args.average,
          assignment: args.assignment,
        },
        {
          where: {
            id: args.id,
          },
        }
      );
    },
    deleteGradeCalc: async (parent, args, context, info) => {
      if (!context.user) {
        // same context used to check if user is logged in
        throw new AuthenticationError(
          "OOPSIE WOOPSIE UWU you are not authenticated!"
        );
      }

      return context.models.GradeCalc.destroy({
        where: {
          id: args.id,
        },
      });
    },
  },
};

module.exports = { gradeCalcDef, gradeCalcResolvers };
