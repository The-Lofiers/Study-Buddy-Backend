"use strict";

const chai = require("chai");
const faker = require("faker");
const EasyGraphQLTester = require("easygraphql-tester");
const { userDefs, userResolvers } = require("../gql/User");
const { assert } = require("chai");
const expect = chai.expect;

describe("Test User GraphQL queries and mutations", () => {
  let tester;

  before(() => {
    tester = new EasyGraphQLTester(userDefs, userResolvers);
  });

  it("should create a user", async () => {
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const mutation = `
                  mutation {
                    createUser(
                      firstname: "${user.firstName}",
                      lastname: "${user.lastName}",
                      email: "${user.email}",
                      password: "${user.password}"
                    )
                  }
            `;
    const result = await tester.mock(mutation);
    expect(result.data.createUser).to.be.an("string");
  });
});
