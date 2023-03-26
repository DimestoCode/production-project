import { fireEvent, screen } from "@testing-library/react";
import React, { Suspense } from "react";
import { renderTestComponent } from "shared/lib/tests/renderComponent";
import { Sidebar } from "./Sidebar";

describe("Sidebar", () => {
    test("renders sucessfully", () => {
        renderTestComponent(
            <Suspense fallback="loading">
                <Sidebar />
            </Suspense>
        );
        expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    });

    test("toggles successfully", () => {
        renderTestComponent(
            <Suspense fallback="loading">
                <Sidebar />
            </Suspense>
        );
        const toggleBtn = screen.getByTestId("sidebar-toggle");
        const sidebar = screen.getByTestId("sidebar");
        expect(sidebar).toBeInTheDocument();

        fireEvent.click(toggleBtn);
        expect(sidebar).toHaveClass("collapsed");
    });
});
