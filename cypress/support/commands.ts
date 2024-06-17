/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add("dataCy", (value: string) => {
  return cy.get(`[data-test-cy="${value}"]`);
});

Cypress.Commands.add("loginWithClerk", () => {
  cy.visit("/");

  cy.get("input#identifier-field").type(Cypress.env("email_test"));
  cy.contains(
    'button[data-localization-key="formButtonPrimary"]',
    /continue/i,
  ).click();

  cy.get("input#password-field").type(Cypress.env("email_password"));
  cy.contains(
    'button[data-localization-key="formButtonPrimary"]',
    /continue/i,
  ).click();
});

Cypress.Commands.add("getServerAndChannelIds", () => {
  // Wait for the final URL
  cy.location("pathname", { timeout: 10000 })
    .should("match", /\/servers\/[^/]+\/channels\/[^/]+/)
    .then((pathname) => {
      const regex = /\/servers\/([^/]+)\/channels\/([^/]+)/;
      const match = pathname.match(regex);

      if (match) {
        const serverId = match[1];
        const channelId = match[2];

        cy.wrap({ serverId, channelId });
      } else {
        throw new Error("Server and Channel IDs not found in URL");
      }
    });
});
