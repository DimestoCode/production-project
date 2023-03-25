import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "app/providers/ThemeProvider";
import { StoreDecorator } from "shared/config/storybook/StoreDecorator/StoreDecorator";
import { Sidebar } from "./Sidebar";

export default {
    title: "widget/Sidebar",
    component: Sidebar,
    argTypes: {
        backgroundColor: { control: "color" }
    }
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = (args) => <Sidebar {...args} />;

export const LightAuth = Template.bind({});
LightAuth.args = {};
LightAuth.decorators = [StoreDecorator({ user: { authData: {} } })];

export const DarkAuth = Template.bind({});
DarkAuth.args = {};
DarkAuth.decorators = [ThemeDecorator(Theme.Dark), StoreDecorator({ user: { authData: {} } })];

export const NonAuth = Template.bind({});
NonAuth.decorators = [StoreDecorator({ user: undefined })];
