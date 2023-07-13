import { screen } from "@testing-library/react";
import { renderTestComponent } from "@/shared/lib/tests/renderTestComponent";
import { AppRouter } from "./AppRouter";
import { getRouteAdmin, getRouteProfile } from "@/shared/const/router";
import { UserRole } from "@/entities/User/testing";

jest.mock("@/pages/ProfilePage/index", () => ({
    ProfilePage: () => <div data-testid="profile-page"> Profile Page</div>
}));

describe("AppRouter", () => {
    test("About page should be rendered if route is /about", async () => {
        renderTestComponent(<AppRouter />, { route: "/about" });

        const page = await screen.findByTestId("about-page");
        expect(page).toBeInTheDocument();
    });

    test("Not found page should be rendered if route doesn't exist", async () => {
        renderTestComponent(<AppRouter />, { route: "/some-random" });

        const page = await screen.findByTestId("not-found-page");
        expect(page).toBeInTheDocument();
    });

    test("Redirect unauthenticated user to main page from protected routes", async () => {
        renderTestComponent(<AppRouter />, { route: getRouteProfile("1") });

        const page = await screen.findByTestId("main-page");
        expect(page).toBeInTheDocument();
    });

    test("Authenticated User can access protected route", async () => {
        renderTestComponent(<AppRouter />, {
            route: getRouteProfile("1"),
            initialState: {
                user: {
                    authData: {
                        id: 1
                    },
                    _initialized: true
                }
            }
        });

        const page = await screen.findByTestId("profile-page");
        expect(page).toBeInTheDocument();
    });

    test("User doesn't have permissions to visit the page", async () => {
        renderTestComponent(<AppRouter />, {
            route: getRouteAdmin(),
            initialState: {
                user: {
                    authData: {},
                    _initialized: true
                }
            }
        });

        const page = await screen.findByTestId("forbidden-page");
        expect(page).toBeInTheDocument();
    });

    test("User has permissions to visit the page", async () => {
        renderTestComponent(<AppRouter />, {
            route: getRouteAdmin(),
            initialState: {
                user: {
                    authData: {
                        roles: [UserRole.Admin]
                    },
                    _initialized: true
                }
            }
        });

        const page = await screen.findByTestId("admin-page");
        expect(page).toBeInTheDocument();
    });
});
