import { fireEvent, screen } from "@testing-library/react";
import React from "react";
import { renderTestComponent } from "shared/lib/tests/renderComponent";
import { Sidebar } from "./Sidebar";

describe("Sidebar", () => {
    test("renders sucessfully", () => {
        renderTestComponent(<Sidebar />);
        expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    });

    test("toggles successfully", () => {
        renderTestComponent(<Sidebar />);
        const toggleBtn = screen.getByTestId("sidebar-toggle");
        const sidebar = screen.getByTestId("sidebar");
        expect(sidebar).toBeInTheDocument();

        fireEvent.click(toggleBtn);
        expect(sidebar).toHaveClass("collapsed");
    });
});
