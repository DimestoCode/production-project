import { DeepPartial } from "@reduxjs/toolkit";
import { render, RenderOptions } from "@testing-library/react";
import { IStoreState, StoreProvider } from "app/providers/StoreProvider";
import { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router-dom";
import i18nForTests from "shared/config/i18n/i18nForTests";

export interface ICustomRenderOptions extends RenderOptions {
    route?: string;
    initialState?: DeepPartial<IStoreState>;
}
export function renderTestComponent(component: ReactNode, options?: ICustomRenderOptions) {
    const { route = "/", initialState, ...rest } = options;
    return render(
        <StoreProvider initialState={initialState as IStoreState}>
            <MemoryRouter initialEntries={[route]}>
                <I18nextProvider i18n={i18nForTests}>{component}</I18nextProvider>
            </MemoryRouter>
        </StoreProvider>,
        rest
    );
}
