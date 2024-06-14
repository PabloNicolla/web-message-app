// Import the custom commands
import "./commands";

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      dataCy(value: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to login with Clerk
       * @example cy.loginWithClerk()
       */
      loginWithClerk(): Chainable<void>;

      /**
       * Custom command to get server and channel IDs from the URL
       * @example cy.getServerAndChannelIds()
       */
      getServerAndChannelIds(): Chainable<{
        serverId: string;
        channelId: string;
      }>;
    }
  }
}
