import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Theme } from "@/shared/const/theme";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";

import { AppLink, AppLinkTheme } from "./AppLink";

export default {
    title: "shared/AppLink",
    component: AppLink,
    argTypes: {
        backgroundColor: { control: "color" }
    },
    args: {
        to: "/"
    }
} as ComponentMeta<typeof AppLink>;

const Template: ComponentStory<typeof AppLink> = (args) => <AppLink {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    theme: AppLinkTheme.Primary,
    children: "Text"
};

export const Secondary = Template.bind({});
Secondary.args = {
    theme: AppLinkTheme.Secondary,
    children: "Text"
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    theme: AppLinkTheme.Primary,
    children: "Text"
};
PrimaryDark.decorators = [ThemeDecorator(Theme.Dark)];

export const SecondaryDark = Template.bind({});
SecondaryDark.args = {
    theme: AppLinkTheme.Secondary,
    children: "Text"
};
SecondaryDark.decorators = [ThemeDecorator(Theme.Dark)];
