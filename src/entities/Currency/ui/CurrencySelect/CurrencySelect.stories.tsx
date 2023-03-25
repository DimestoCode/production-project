import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Theme } from "app/providers/ThemeProvider";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { CurrencySelect } from "./CurrencySelect";

export default {
    title: "entities/CurrencySelect",
    component: CurrencySelect,
    argTypes: {
        backgroundColor: { control: "color" }
    },
    args: {
        to: "/"
    }
} as ComponentMeta<typeof CurrencySelect>;

const Template: ComponentStory<typeof CurrencySelect> = (args) => <CurrencySelect {...args} />;

export const Light = Template.bind({});
Light.args = {
    label: "Currency"
};

export const Dark = Template.bind({});
Dark.args = {
    label: "Currency"
};
Dark.decorators = [ThemeDecorator(Theme.Dark)];

export const DisabledLight = Template.bind({});
DisabledLight.args = {
    label: "Currency",
    disabled: true
};

export const DisabledDark = Template.bind({});
DisabledDark.args = {
    label: "Currency",
    disabled: true
};
DisabledDark.decorators = [ThemeDecorator(Theme.Dark)];
