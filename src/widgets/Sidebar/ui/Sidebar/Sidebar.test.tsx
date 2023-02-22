import { fireEvent, screen } from "@testing-library/react";
import React from "react";
import { renderWithTranslation } from "shared/lib/tests/renderWithTranslation";
import { Sidebar } from "./Sidebar";

describe("Sidebar", () => {
    test("renders sucessfully", () => {
        renderWithTranslation(<Sidebar />);
        expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    });

    test("toggles successfully", () => {
        renderWithTranslation(<Sidebar />);
        const toggleBtn = screen.getByTestId("sidebar-toggle");
        const sidebar = screen.getByTestId("sidebar");
        expect(sidebar).toBeInTheDocument();

        fireEvent.click(toggleBtn);
        expect(sidebar).toHaveClass("collapsed");
    });
});
