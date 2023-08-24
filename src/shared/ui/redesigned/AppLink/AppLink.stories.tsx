import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Theme } from "@/shared/const/theme";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";

import { AppLink } from "./AppLink";

export default {
    title: "shared/redesigned/AppLink",
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
    variant: "primary",
    children: "Text"
};

export const Secondary = Template.bind({});
Secondary.args = {
    variant: "secondary",
    children: "Text"
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    variant: "primary",
    children: "Text"
};
PrimaryDark.decorators = [ThemeDecorator(Theme.Dark)];

export const SecondaryDark = Template.bind({});
SecondaryDark.args = {
    variant: "secondary",
    children: "Text"
};
SecondaryDark.decorators = [ThemeDecorator(Theme.Dark)];
