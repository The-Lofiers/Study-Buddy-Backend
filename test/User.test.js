"use strict";

const chai = require("chai");
const faker = require("faker");
const url = `http://localhost:4000/`;
const request = require("supertest")(url);
const expect = chai.expect;

describe("Test User GraphQL queries and mutations", () => {
  it("should create a user, get a user", async () => {
    let token = "";
    let user_id = 0;
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
                      password: "Heyoooooo12!"
                    )
                    {
                      token
                      user {
                        id
                      }
                    }
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
        const query = `
        query {
          user(id: ${response.body.data.createUser.user.id}) {
            id
            firstname
            lastname
            email
            password
            createdAt
            updatedAt
          }
        }
  `;
        request
          .post("graphql")
          .set("Authorization", response.body.data.createUser.token)
          .send({
            query: query,
            headers: {
              "Content-Type": "application/json",
            },
          })
          .expect(200) // status code that you expect to be returned
          .end(function (error, response) {
            if (error) console.log(error);
            console.log(response.body.data.user);
            expect(response.body.errors).to.be.undefined;
            expect(response.body.data.user.id).to.be.a("number");
            expect(response.body.data.user.firstname).to.be.a("string");
            expect(response.body.data.user.lastname).to.be.a("string");
            expect(response.body.data.user.email).to.be.a("string");
            expect(response.body.data.user.password).to.be.a("string");
            expect(response.body.data.user.createdAt).to.be.a("string");
            expect(response.body.data.user.updatedAt).to.be.a("string");
          });
        expect(response.body.errors).to.be.undefined;
        expect(response.body.data.createUser.token).to.be.a("string");
        expect(response.body.data.createUser.user.id).to.be.a("number");
        expect(response.body.data.createUser.token).to.not.be.empty;
        expect(response.body.data.createUser.token.length).to.be.equal(105);
      });
  });
});
