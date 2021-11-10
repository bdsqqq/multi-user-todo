/// <reference types="cypress" />

describe("Todo fetching", () => {
  it("should display fetched todos", () => {
    // Start from the user 1 page
    cy.visit("http://localhost:3000/user/1");

    // Intercept the request
    cy.intercept("https://jsonplaceholder.typicode.com/users/1/todos", {
      fixture: "todos.json",
    });

    // The page should contain an li with the title from todo 1 (delectus aut autem)
    cy.get("li").contains("delectus aut autem");
  });
});

export {};
