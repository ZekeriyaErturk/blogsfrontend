const { func } = require("prop-types");

describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      username: "tester",
      user: "test user",
      password: "password",
    };
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.visit("http://localhost:3000");
  });

  it("login form is shown", function () {
    cy.contains("Username");
    cy.contains("Password");
    cy.contains("Login");
  });

  describe("testing login functionality", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("tester");
      cy.get("#password").type("password");
      cy.contains("Login").click();
      cy.contains("blogs");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("test");
      cy.get("#password").type("password");
      cy.contains("Login").click();
      cy.get(".error")
        .should("contain", "wrong username or password")
        .and("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.get("#username").type("tester");
      cy.get("#password").type("password");
      cy.contains("Login").click();
    });

    it("A blog can be created", function () {
      cy.contains("new blog").click();
      cy.contains("title").type("new blog for testing");
      cy.contains("author").type("test user");
      cy.contains("url").type("www.testing.com");
      cy.contains("create").click();
      cy.contains("new blog for testing");
    });
  });
});
