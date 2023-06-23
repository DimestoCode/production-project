import { USER_LOCAL_STORAGE_KEY } from "../../../src/shared/const/localStorage";
import { IUser } from "../../../src/entities/User";

export function login(username: string = "admin", password: string = "123") {
    return cy
        .request({
            method: "POST",
            url: "http://localhost:8000/login",
            body: {
                username,
                password
            }
        })
        .then(({ body }) => {
            window.localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(body));
            return body;
        });
}

declare global {
    namespace Cypress {
        interface Chainable {
            login(email?: string, password?: string): Chainable<IUser>;
        }
    }
}
