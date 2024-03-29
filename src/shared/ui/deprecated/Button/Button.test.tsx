import React from "react";
import { render, screen } from "@testing-library/react";
import { Button, ButtonTheme } from "./Button";

describe("Button", () => {
    test("renders without params", () => {
        render(<Button>Hello</Button>);
        expect(screen.getByText("Hello")).toBeInTheDocument();
    });

    test("renders using clear theme", () => {
        render(<Button theme={ButtonTheme.Clear}>Hello</Button>);
        const btn = screen.getByText("Hello");
        expect(btn).toHaveClass("clear");
    });
});
