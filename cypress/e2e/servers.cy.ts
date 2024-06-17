describe("create and delete server", () => {
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

    // Step 3 open create-server modal
    cy.dataCy("create-server-button").click();

    // Step 4 type server name
    cy.dataCy("enter-server-name-input").type("my new server");
    cy.wait(1000);

    // Step 5 upload server image
    cy.get(
      'div[class="mt-2 flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 text-center"]',
    ).selectFile("cypress/test_resources/flower2.jpeg", {
      action: "drag-drop",
    });
    cy.wait(1000);
    cy.get(
      'div[class="mt-2 flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 text-center bg-blue-600/10"]',
    ).within(() => {
      cy.get("button").click();
    });

    // Step 6 submit server
    cy.intercept("GET", "https://uploadthing.com/api/serverCallback").as(
      "imageUpload",
    );
    cy.wait("@imageUpload");
    cy.wait(10000);
    cy.dataCy("create-server-submit-button").click();

    // Step 7 open new server
    cy.wait(1000);
    cy.dataCy("server-item-my new server").click();
    cy.wait(5000);

    // Step 8 open server dropdown
    cy.dataCy("server-header-dropdown").click();
    cy.dataCy("server-header-dropdown-invite-button").click();
    cy.dataCy("generate-invite-server-button").click();
    cy.wait(2000);
    cy.get('svg[class="lucide lucide-x h-4 w-4"]').click();

    // Step 9 edit server name
    cy.dataCy("server-header-dropdown").click();
    cy.dataCy("server-header-dropdown-edit-button").click();
    cy.dataCy("edit-server-modal-name-input").clear().type("my new server 2");
    cy.dataCy("edit-server-modal-submit-button").click();

    // Step 10 open members control
    cy.dataCy("server-header-dropdown").click();
    cy.dataCy("server-header-dropdown-members-button").click();
    cy.get('svg[class="lucide lucide-x h-4 w-4"]').click();

    // Step 11 open create channel
    cy.dataCy("server-header-dropdown").click();
    cy.dataCy("server-header-dropdown-channel-button").click();
    cy.get('svg[class="lucide lucide-x h-4 w-4"]').click();

    // Step 12 delete server
    cy.dataCy("server-header-dropdown").click();
    cy.dataCy("server-header-dropdown-delete-button").click();
    cy.dataCy("delete-server-button").click();
  });
});
