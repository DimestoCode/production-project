import { addDecorator } from "@storybook/react";
import { StyleDecorator } from "../../src/shared/config/storybook/StyleDecorator/StyleDecorator";
import { ThemeDecorator } from "../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "../../src/app/providers/ThemeProvider";
import { RouterDecorator } from "../../src/shared/config/storybook/RouterDecorator/RouterDecorator";
// import { I18nDecorator } from "../../src/shared/config/storybook/I18nDecorator/I18nDecorator";

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/
        }
    }
};

// export const globalTypes = {
//     locale: {
//         name: "Locale",
//         description: "Internationalization locale",
//         toolbar: {
//             icon: "globe",
//             items: [
//                 { value: "en", title: "English" },
//                 { value: "ua", title: "Ukrainian" }
//             ],
//             showName: true
//         }
//     }
// };
addDecorator(RouterDecorator);
// addDecorator(I18nDecorator);
addDecorator(StyleDecorator);
addDecorator(ThemeDecorator(Theme.LIGHT));
