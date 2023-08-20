import { addDecorator } from "@storybook/react";
import { initialize, mswDecorator } from "msw-storybook-addon";
import { Theme } from "../../src/shared/const/theme";
import { StyleDecorator } from "../../src/shared/config/storybook/StyleDecorator/StyleDecorator";
import { ThemeDecorator } from "../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { I18nDecorator } from "../../src/shared/config/storybook/I18nDecorator/I18nDecorator";
import { RouterDecorator } from "../../src/shared/config/storybook/RouterDecorator/RouterDecorator";
import { SuspenseDecorator } from "../../src/shared/config/storybook/SuspenseDecorator/SuspenseDecorator";
import { StoreDecorator } from "../../src/shared/config/storybook/StoreDecorator/StoreDecorator";
import { FeaturesDecorator } from "../../src/shared/config/storybook/FeaturesDecorator/FeaturesDecorator";

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/
        }
    },
    themes: {
        default: "light",
        list: [
            { name: "light", class: Theme.Light, color: "#fff" },
            { name: "dark", class: Theme.Dark, color: "#000" },
            { name: "orange", class: Theme.Orange, color: "#ffb005" }
        ]
    }
};

export const globalTypes = {
    locale: {
        name: "Locale",
        description: "Internationalization locale",
        toolbar: {
            icon: "globe",
            items: [
                { value: "en", title: "English" },
                { value: "ua", title: "Ukrainian" }
            ],
            showName: true
        }
    }
};

initialize();

addDecorator(RouterDecorator);
addDecorator(I18nDecorator);
addDecorator(StyleDecorator);
addDecorator(ThemeDecorator(Theme.LIGHT));
addDecorator(mswDecorator);
addDecorator(SuspenseDecorator);
addDecorator(
    StoreDecorator({
        user: {
            authData: {
                id: 1,
                username: "Dima"
            }
        }
    })
);
addDecorator(
    FeaturesDecorator({
        isAppRedesigned: false,
        isArticleRatingEnabled: true
    })
);
