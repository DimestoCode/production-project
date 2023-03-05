import { screen } from "@testing-library/react";
import { renderTestComponent } from "shared/lib/tests/renderComponent";
import userEvent from "@testing-library/user-event";
import { Counter } from "./Counter";

describe("Counter", () => {
    test("renders successfully", () => {
        renderTestComponent(<Counter />, {
            initialState: {
                counter: {
                    value: 10
                }
            }
        });

        expect(screen.getByTestId("counterValue")).toHaveTextContent("10");
    });
    test("increment", async () => {
        renderTestComponent(<Counter />, {
            initialState: {
                counter: {
                    value: 10
                }
            }
        });

        const incrementBtn = screen.getByTestId("incrementBtn");
        await userEvent.click(incrementBtn);

        expect(screen.getByTestId("counterValue")).toHaveTextContent("11");
    });

    test("decrement", async () => {
        renderTestComponent(<Counter />, {
            initialState: {
                counter: {
                    value: 10
                }
            }
        });

        const decrementBtn = screen.getByTestId("decrementBtn");
        await userEvent.click(decrementBtn);

        expect(screen.getByTestId("counterValue")).toHaveTextContent("9");
    });
});
