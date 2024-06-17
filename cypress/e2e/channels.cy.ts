describe("create and delete server", () => {
  // Ignore NEXT_REDIRECT errors
  Cypress.on("uncaught:exception", (err) => {
    if (err.message.includes("NEXT_REDIRECT")) {
      return false;
    }
    // Allow other errors to fail the test
    return true;
  });

  it("test", () => {
    // Step 1: Visit the home page and perform login
    cy.visit("/");

    // Step 2: Perform login (this will redirect the user)
    cy.loginWithClerk();

    // Intercept the final URL pattern to ensure we wait for it
    cy.intercept("GET", /\/servers\/([^/]+)\/channels\/([^/]+)/).as(
      "channelsPage",
    );

    // Wait for the final URL to load
    cy.wait("@channelsPage");

    // Step 3 open create-channel modal
    cy.dataCy("server-header-dropdown").click();
    cy.dataCy("server-header-dropdown-channel-button").click();
    cy.wait(1000);
    cy.dataCy("create-channel-name-input").type("my new channel");
    cy.dataCy("create-channel-submit-button").click();

    // Step 4 chat in new channel
    cy.dataCy("server-text-channel-my new channel").click();
    cy.wait(3000);
    cy.dataCy("chat-input").type("hello world{enter}");
    cy.wait(1000);
    cy.dataCy("chat-input").type("hello world1{enter}");
    cy.wait(1000);
    cy.dataCy("chat-input").type("hello world2{enter}");
    cy.wait(1000);
    cy.dataCy("chat-input").type("hello world3{enter}");
    cy.wait(1000);

    // Step 5 delete channel
    cy.dataCy("server-text-channel-my new channel").within(() => {
      cy.dataCy("delete-channel-icon").click({ force: true });
    });

    cy.dataCy("delete-channel-confirm-button").click();
  });
});
