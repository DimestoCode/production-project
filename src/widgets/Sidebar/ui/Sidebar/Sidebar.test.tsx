import { fireEvent, screen } from "@testing-library/react";
import React from "react";
import { renderComponent } from "shared/lib/tests/renderComponent";
import { Sidebar } from "./Sidebar";

describe("Sidebar", () => {
    test("renders sucessfully", () => {
        renderComponent(<Sidebar />);
        expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    });

    test("toggles successfully", () => {
        renderComponent(<Sidebar />);
        const toggleBtn = screen.getByTestId("sidebar-toggle");
        const sidebar = screen.getByTestId("sidebar");
        expect(sidebar).toBeInTheDocument();

        fireEvent.click(toggleBtn);
        expect(sidebar).toHaveClass("collapsed");
    });
});
