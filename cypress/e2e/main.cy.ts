describe("template spec", () => {
  beforeEach(() => {
    cy.loginWithClerk();
  });

  it("get", () => {
    cy.visit("/");
    cy.contains(/Customize your server/i);
  });
});
