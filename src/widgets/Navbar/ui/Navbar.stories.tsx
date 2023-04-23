import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "app/providers/ThemeProvider";
import { StoreDecorator } from "shared/config/storybook/StoreDecorator/StoreDecorator";
import { Navbar } from "./Navbar";

export default {
    title: "widgets/Navbar",
    component: Navbar,
    argTypes: {
        backgroundColor: { control: "color" }
    }
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />;

export const LightUnauthenticated = Template.bind({});
LightUnauthenticated.args = {};
LightUnauthenticated.decorators = [StoreDecorator({})];

export const DarkUnauthenticated = Template.bind({});
DarkUnauthenticated.args = {};
DarkUnauthenticated.decorators = [ThemeDecorator(Theme.Dark), StoreDecorator({})];

export const LightAuthenticated = Template.bind({});
LightAuthenticated.args = {};
LightAuthenticated.decorators = [
    StoreDecorator({
        user: {
            authData: {
                username: "Test"
            }
        }
    })
];

export const DarkAuthenticated = Template.bind({});
DarkAuthenticated.args = {};
DarkAuthenticated.decorators = [
    ThemeDecorator(Theme.Dark),
    StoreDecorator({
        user: {
            authData: {
                username: "Test"
            }
        }
    })
];
