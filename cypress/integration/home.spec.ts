/// <reference types="cypress" />

describe("User fetching", () => {
  it("should display fetched users", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");

    // Intercept the request
    cy.intercept("https://jsonplaceholder.typicode.com/users", {
      fixture: "users.json",
    });

    // The page should contain an li with the name from user 1 (Leanne Graham)
    cy.get("li").contains("Leanne Graham");
  });
});

describe("Navigation", () => {
  it("should navigate to a user's page", () => {
    // Start from the index page
    cy.visit("http://localhost:3000");

    // Intercept the request
    cy.intercept("https://jsonplaceholder.typicode.com/users", {
      fixture: "users.json",
    });

    // Click on the link from one of the users
    cy.get("a").contains("Leanne Graham").click();

    // The new url should include "user"
    cy.url().should("contain", "user");

    // The new page should contain an a with "Back home"
    cy.get("a").contains("Back home");
  });
});

export {};
