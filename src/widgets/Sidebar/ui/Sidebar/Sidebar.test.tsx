import { fireEvent, screen } from "@testing-library/react";
import React, { Suspense } from "react";
import { renderTestComponent } from "@/shared/lib/tests/renderComponent";
import { Sidebar } from "./Sidebar";

describe("Sidebar", () => {
    test("renders sucessfully", async () => {
        renderTestComponent(
            <Suspense fallback="loading">
                <Sidebar />
            </Suspense>
        );
        expect(await screen.findByTestId("sidebar")).toBeInTheDocument();
    });

    test("toggles successfully", async () => {
        renderTestComponent(
            <Suspense fallback="loading">
                <Sidebar />
            </Suspense>
        );
        const toggleBtn = await screen.findByTestId("sidebar-toggle");
        const sidebar = screen.getByTestId("sidebar");
        expect(sidebar).toBeInTheDocument();

        fireEvent.click(toggleBtn);
        expect(sidebar).toHaveClass("collapsed");
    });
});
