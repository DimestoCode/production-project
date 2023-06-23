import { selectByTestId } from "cypress/helpers/selectByTestId";

describe("Routing", () => {
    describe("User is not authenticated", () => {
        it("gets redirected to main page", () => {
            cy.visit("/");
            cy.get(selectByTestId("main-page")).should("exist");
        });

        it("gets redirected from the existing page", () => {
            cy.visit("/profile/1");
            cy.get(selectByTestId("main-page")).should("exist");
        });

        it("gets redirected from not existing page", () => {
            cy.visit("/not-existing-page");
            cy.get(selectByTestId("not-found-page")).should("exist");
        });
    });

    describe("User is authenticated", () => {
        beforeEach(() => {
            cy.login();
        });

        it("gets redirected to profile page", () => {
            cy.visit("/profile/1");
            cy.get(selectByTestId("profile-page")).should("exist");
        });

        it("gets redirected to articles page", () => {
            cy.visit("/articles");
            cy.get(selectByTestId("articles-page")).should("exist");
        });
    });
});
