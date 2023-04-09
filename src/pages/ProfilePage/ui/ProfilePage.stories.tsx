import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "app/providers/ThemeProvider";
import { StoreDecorator } from "shared/config/storybook/StoreDecorator/StoreDecorator";
import { Country } from "entities/Country";
import { Currency } from "entities/Currency";
import ProfileImg from "shared/assets/tests/profile.jpg";
import ProfilePage from "./ProfilePage";

export default {
    title: "pages/ProfilePage",
    component: ProfilePage,
    parameters: {
        router: {
            path: "/profile/:profileId",
            route: "/profile/1"
        }
    },
    argTypes: {
        backgroundColor: { control: "color" }
    }
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = () => <ProfilePage />;

export const DisabledLight = Template.bind({});
DisabledLight.decorators = [
    StoreDecorator({
        profile: {
            form: {
                username: "admin",
                age: 22,
                city: "NY",
                country: Country.USA,
                currency: Currency.USD,
                firstName: "Dima",
                lastName: "Andoniev",
                avatar: ProfileImg
            },
            readonly: true
        }
    })
];
export const DisabledDark = Template.bind({});
DisabledDark.decorators = [
    ThemeDecorator(Theme.Dark),
    StoreDecorator({
        profile: {
            form: {
                username: "admin",
                age: 22,
                city: "NY",
                country: Country.USA,
                currency: Currency.USD,
                firstName: "Dima",
                lastName: "Andoniev",
                avatar: ProfileImg
            },
            readonly: true
        }
    })
];

export const EnabledLight = Template.bind({});
EnabledLight.decorators = [
    StoreDecorator({
        profile: {
            form: {
                username: "admin",
                age: 22,
                city: "NY",
                country: Country.USA,
                currency: Currency.USD,
                firstName: "Dima",
                lastName: "Andoniev",
                avatar: ProfileImg
            },
            readonly: false
        }
    })
];
export const EnabledDark = Template.bind({});
EnabledDark.decorators = [
    ThemeDecorator(Theme.Dark),
    StoreDecorator({
        profile: {
            form: {
                username: "admin",
                age: 22,
                city: "NY",
                country: Country.USA,
                currency: Currency.USD,
                firstName: "Dima",
                lastName: "Andoniev",
                avatar: ProfileImg
            },
            readonly: false
        }
    })
];
