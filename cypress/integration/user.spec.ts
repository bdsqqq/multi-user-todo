/// <reference types="cypress" />

describe("Add todo", () => {
  it("should add a todo after filling and sending the form", () => {
    // Start from the user 1 page
    cy.visit("http://localhost:3000/user/1");

    // find the input and type "Hello, world"
    cy.get("#todoInput").type("Hello, world");

    // find the submit button and click it
    cy.get("#submitButton").click();

    // the page should contain a label with "Hello, world"
    cy.get("label").contains("Hello, world");
  });
});

describe("Todo fetching", () => {
  it("should display fetched todos", () => {
    // Start from the user 1 page
    cy.visit("http://localhost:3000/user/1");

    // Intercept the request
    cy.intercept("https://jsonplaceholder.typicode.com/users/1/todos", {
      fixture: "todos.json",
    });

    // The page should contain a label with the title from todo 1 (delectus aut autem)
    cy.get("label").contains("delectus aut autem");
  });
});

describe("Navigation", () => {
  it("should navigate to the home page", () => {
    // Start from the user 1 page
    cy.visit("http://localhost:3000/user/1");

    // Find a link with an href attribute containing "/" and click it
    cy.get("a").contains("Back home").click();

    // The new url should include "localhost:3000"
    cy.url().should("contain", "localhost:3000");

    // The new page should contain an h1 with "Click on a user to see their todo items"
    cy.get("h1").contains("Click on a user to see their todo items");
  });
});

export {};
