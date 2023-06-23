import { resetProfile } from "cypress/support/commands/profile";

let profileId: string = "";

describe("User attends profile page", () => {
    beforeEach(() => {
        cy.visit("");
        cy.login().then((data) => {
            profileId = String(data.id);
            cy.visit(`profile/${data.id}`);
        });
    });

    afterEach(() => {
        resetProfile(profileId);
    });
    it("profile gets loaded successfully", () => {
        cy.getByTestId("ProfileCard.firstName").should("have.value", "Dima");
    });

    it("edits profile form", () => {
        const newName = "new name";
        const newLastName = "new lastname";

        cy.updateProfile(newName, newLastName);
        cy.getByTestId("ProfileCard.firstName").should("have.value", newName);
        cy.getByTestId("ProfileCard.lastName").should("have.value", newLastName);
    });
});
