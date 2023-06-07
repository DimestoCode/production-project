import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Theme } from "@/shared/const/theme";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { CountrySelect } from "./CountrySelect";

export default {
    title: "entities/CountrySelect",
    component: CountrySelect,
    argTypes: {
        backgroundColor: { control: "color" }
    },
    args: {
        to: "/"
    }
} as ComponentMeta<typeof CountrySelect>;

const Template: ComponentStory<typeof CountrySelect> = (args) => <CountrySelect {...args} />;

export const Light = Template.bind({});
Light.args = {
    label: "Country"
};

export const Dark = Template.bind({});
Dark.args = {
    label: "Country"
};
Dark.decorators = [ThemeDecorator(Theme.Dark)];

export const DisabledLight = Template.bind({});
DisabledLight.args = {
    label: "Country",
    disabled: true
};

export const DisabledDark = Template.bind({});
DisabledDark.args = {
    label: "Country",
    disabled: true
};
DisabledDark.decorators = [ThemeDecorator(Theme.Dark)];
