import { EditableProfileCard } from "@/features/EditableProfileCard";
import { TestProvider } from "@/shared/lib/tests/renderTestComponent";
import profile from "../fixtures/profile.json";

describe("EditableProfileCard", () => {
    it("edit button should enable form and change view of the page", () => {
        cy.intercept("GET", "**/profile/*", { fixture: "profile.json" });
        cy.mount(
            <TestProvider
                options={{
                    initialState: {
                        user: {
                            authData: {
                                id: 1
                            }
                        }
                    }
                }}
            >
                <EditableProfileCard profileId={1} />
            </TestProvider>
        );

        cy.getByTestId("EditableProfileCardHeader.EditButton")
            .as("edit-btn")
            .should("exist")
            .click()
            .should("not.exist");
        cy.getByTestId("EditableProfileCardHeader.SaveButton").as("save-btn").should("exist");
        cy.getByTestId("EditableProfileCardHeader.CancelButton").as("cancel-btn").should("exist");
        cy.getByTestId("ProfileCard.firstName")
            .as("firstName")
            .should("exist")
            .should("be.enabled")
            .should("have.value", profile.firstName)
            .clear()
            .type("Updated Name");
        cy.getByTestId("ProfileCard.lastName")
            .as("lastName")
            .should("exist")
            .should("be.enabled")
            .should("have.value", profile.lastName)
            .type("Updated last name");

        cy.intercept("PUT", "**/profile/*", { statusCode: 200, body: profile });
        cy.get("@save-btn").click();

        cy.get("@save-btn").should("not.exist");
        cy.get("@cancel-btn").should("not.exist");
        cy.get("@edit-btn").should("exist");
    });
});
