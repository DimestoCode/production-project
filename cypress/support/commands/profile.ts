export const updateProfile = (firstName: string, lastName: string) => {
    cy.getByTestId("EditableProfileCardHeader.EditButton").click();
    cy.getByTestId("ProfileCard.firstName").clear().type(firstName);
    cy.getByTestId("ProfileCard.lastName").clear().type(lastName);
    cy.getByTestId("EditableProfileCardHeader.SaveButton").click();
};

export const resetProfile = (profileId: string) => {
    return cy.request({
        method: "PUT",
        url: `http://localhost:8000/profile/${profileId}`,
        headers: { Authorization: {} },
        body: {
            id: Number(profileId),
            firstName: "Dima",
            lastName: "Andoniev",
            age: 23,
            currency: "USD",
            country: "Ukraine",
            city: "Kharkiv",
            username: "admin",
            avatar: "https://i.pinimg.com/564x/d4/28/bb/d428bb4dff60cf6df9b282ce58efcade.jpg"
        }
    });
};

declare global {
    namespace Cypress {
        interface Chainable {
            updateProfile(firstName: string, lastName: string): Chainable<void>;
            resetProfile(profileId: string): Chainable<void>;
        }
    }
}
