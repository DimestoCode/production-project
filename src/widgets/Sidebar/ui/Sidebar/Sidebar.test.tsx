import { fireEvent, screen } from "@testing-library/react";
import { Suspense } from "react";
import { renderTestComponent } from "@/shared/lib/tests/renderTestComponent";
import { Sidebar } from "./Sidebar";
import { IStoreState } from "@/app/providers/StoreProvider";
import { getFeatureFlag } from "@/shared/lib/features/setGetFeatures";

jest.mock("@/shared/lib/features/setGetFeatures");
(getFeatureFlag as jest.Mock<boolean>).mockReturnValue(false);

const initialState: DeepPartial<IStoreState> = {
    user: {
        authData: {
            id: 1
        }
    }
};

describe("Sidebar", () => {
    test("renders sucessfully", async () => {
        renderTestComponent(
            <Suspense fallback="loading">
                <Sidebar />
            </Suspense>,
            {
                initialState
            }
        );

        expect(await screen.findByTestId("sidebar")).toBeInTheDocument();
    });

    test("toggles successfully", async () => {
        renderTestComponent(
            <Suspense fallback="loading">
                <Sidebar />
            </Suspense>,
            {
                initialState
            }
        );
        const toggleBtn = await screen.findByTestId("sidebar-toggle");
        const sidebar = screen.getByTestId("sidebar");
        expect(sidebar).toBeInTheDocument();

        fireEvent.click(toggleBtn);
        expect(sidebar).toHaveClass("collapsed");
    });
});
