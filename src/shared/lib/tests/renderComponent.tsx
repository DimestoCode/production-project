import { render, RenderOptions } from "@testing-library/react";
import { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router-dom";
import { IStoreState, StoreProvider } from "@/app/providers/StoreProvider";
import i18nForTests from "@/shared/config/i18n/i18nForTests";
import { Reducers } from "../hooks/useDynamicModuleLoader/useDynamicModuleLoader";

export interface ICustomRenderOptions extends RenderOptions {
    route?: string;
    initialState?: DeepPartial<IStoreState>;
    asyncReducers?: DeepPartial<Reducers>;
}

export function renderTestComponent(component: ReactNode, options: ICustomRenderOptions = {}) {
    const { route = "/", initialState, asyncReducers, ...rest } = options;
    return render(
        <MemoryRouter initialEntries={[route]}>
            <StoreProvider asyncReducers={asyncReducers} initialState={initialState as IStoreState}>
                <I18nextProvider i18n={i18nForTests}>{component}</I18nextProvider>
            </StoreProvider>
        </MemoryRouter>,
        rest
    );
}
