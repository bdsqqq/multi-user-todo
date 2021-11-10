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

export {};
