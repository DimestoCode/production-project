import { Story as StoryType, StoryContext } from "@storybook/react";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";

export const RouterDecorator = (Story: StoryType, { parameters: { router } }: StoryContext) => {
    if (!router) {
        return (
            <BrowserRouter>
                <Story />
            </BrowserRouter>
        );
    }

    const { path, route } = router;
    return (
        <MemoryRouter initialEntries={[route]}>
            <Routes>
                <Route element={<Story />} path={path} />
            </Routes>
        </MemoryRouter>
    );
};
