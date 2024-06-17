describe("sign in & sign out with clerk", () => {
  // Ignore NEXT_REDIRECT errors
  Cypress.on("uncaught:exception", (err) => {
    if (err.message.includes("NEXT_REDIRECT")) {
      return false;
    }
    // Allow other errors to fail the test
    return true;
  });

  it("main test", () => {
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

    // Step 3: Wait for the URL to change and extract serverId and channelId
    cy.getServerAndChannelIds().then(({ serverId, channelId }) => {
      // Step 4: Continue with the remainder of the test
      cy.contains(/@gmail.com/).should("not.exist");
      cy.contains(/secured by/i).should("not.exist");
      cy.contains(/manage account/i).should("not.exist");
      cy.contains(/sign out/i).should("not.exist");

      // Step 5: Open user dropdown
      cy.get('[data-cy="user-avatar-button"]').click();

      // Step 6: Check if was open
      cy.contains(/@gmail.com/);
      cy.contains(/secured by/i);
      cy.contains(/manage account/i);
      cy.contains(/sign out/i);

      cy.log(`${serverId} ${channelId}`);

      // Step 7: sign out
      cy.contains("button", "Sign out").click();
    });

    cy.intercept("GET", /\/sign-in/).as("sign-in");

    cy.wait("@sign-in");

    cy.contains("h1", /sign in/i);
  });
});
