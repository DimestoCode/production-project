import { selectByTestId } from "../../helpers/selectByTestId";

export function getByTestId(testId: string) {
    return cy.get(selectByTestId(testId));
}

declare global {
    namespace Cypress {
        interface Chainable {
            getByTestId<S = any>(testId: string): Chainable<S>;
        }
    }
}
