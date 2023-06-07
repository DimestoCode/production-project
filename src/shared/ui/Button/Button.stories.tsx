import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@/shared/const/theme";
import { Button, ButtonSize, ButtonTheme } from "./Button";

export default {
    title: "shared/Button",
    component: Button,
    argTypes: {
        backgroundColor: { control: "color" }
    }
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children: "Text"
};

export const Clear = Template.bind({});
Clear.args = {
    children: "Text",
    theme: ButtonTheme.Clear
};

export const ClearInverted = Template.bind({});
ClearInverted.args = {
    children: "Text",
    theme: ButtonTheme.ClearInverted
};

export const Background = Template.bind({});
Background.args = {
    children: ">",
    theme: ButtonTheme.Background
};

export const BackgroundInverted = Template.bind({});
BackgroundInverted.args = {
    children: ">",
    theme: ButtonTheme.BackgroundInverted
};

export const OutlineDark = Template.bind({});
OutlineDark.args = {
    children: "Text",
    theme: ButtonTheme.Outline
};
OutlineDark.decorators = [ThemeDecorator(Theme.Dark)];

export const OutlineLight = Template.bind({});
OutlineLight.args = {
    children: "Text",
    theme: ButtonTheme.Outline
};

export const Square = Template.bind({});
Square.args = {
    children: ">",
    square: true
};

export const SquareM = Template.bind({});
SquareM.args = {
    children: ">",
    theme: ButtonTheme.BackgroundInverted,
    square: true,
    size: ButtonSize.M
};

export const SquareL = Template.bind({});
SquareL.args = {
    children: ">",
    theme: ButtonTheme.BackgroundInverted,
    square: true,
    size: ButtonSize.L
};

export const SquareXL = Template.bind({});
SquareXL.args = {
    children: ">",
    theme: ButtonTheme.BackgroundInverted,
    square: true,
    size: ButtonSize.XL
};

export const OutlineLightL = Template.bind({});
OutlineLightL.args = {
    children: "Text",
    theme: ButtonTheme.Outline,
    size: ButtonSize.L
};

export const OutlineLightXL = Template.bind({});
OutlineLightXL.args = {
    children: "Text",
    theme: ButtonTheme.Outline,
    size: ButtonSize.XL
};

export const Disabled = Template.bind({});
Disabled.args = {
    children: "Text",
    disabled: true
};
