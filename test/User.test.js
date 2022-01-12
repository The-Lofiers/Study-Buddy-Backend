"use strict";

const chai = require("chai");
const faker = require("faker");
const url = `http://localhost:4000/`;
const request = require("supertest")(url);
const expect = chai.expect;

describe("Test User GraphQL queries and mutations", () => {
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
    request
      .post("graphql")
      .send({
        query: mutation,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .expect(200) // status code that you expect to be returned
      .end(function (error, response) {
        if (error) console.log(error);
        expect(response.body.errors).to.be.undefined;
        expect(response.body.data.createUser).to.be.a("string");
        expect(response.body.data.createUser).to.not.be.empty;
        expect(response.body.data.createUser.length).to.be.equal(105);
      });
  });
});
