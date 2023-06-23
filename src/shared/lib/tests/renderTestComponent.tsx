/* eslint-disable fsd-path-checker-by-dandoniev/fsd-layer-imports */
import { render, RenderOptions } from "@testing-library/react";
import { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router-dom";
import { IStoreState, StoreProvider } from "@/app/providers/StoreProvider";
import i18nForTests from "@/shared/config/i18n/i18nForTests";
import { Reducers } from "../hooks/useDynamicModuleLoader/useDynamicModuleLoader";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import { Theme } from "@/shared/const/theme";
import "@/app/styles/index.scss";

export interface ICustomRenderOptions extends RenderOptions {
    route?: string;
    initialState?: DeepPartial<IStoreState>;
    asyncReducers?: DeepPartial<Reducers>;
    theme?: Theme;
}

type TestProviderProps = {
    children: ReactNode;
    options?: Pick<ICustomRenderOptions, "route" | "initialState" | "asyncReducers" | "theme">;
};

export function TestProvider({ children, options = {} }: TestProviderProps) {
    const { route = "/", initialState, asyncReducers, theme = Theme.Light } = options;
    return (
        <MemoryRouter initialEntries={[route]}>
            <StoreProvider asyncReducers={asyncReducers} initialState={initialState as IStoreState}>
                <ThemeProvider initialTheme={theme}>
                    <I18nextProvider i18n={i18nForTests}>{children}</I18nextProvider>
                </ThemeProvider>
            </StoreProvider>
        </MemoryRouter>
    );
}

export function renderTestComponent(component: ReactNode, options: ICustomRenderOptions = {}) {
    const { route = "/", initialState, asyncReducers, ...rest } = options;
    return render(<TestProvider options={{ route, initialState, asyncReducers }}>{component}</TestProvider>, rest);
}
