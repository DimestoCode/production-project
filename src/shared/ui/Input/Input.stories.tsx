import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Theme } from "@/shared/const/theme";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";

import { Input } from "./Input";

export default {
    title: "shared/Input",
    component: Input,
    argTypes: {
        backgroundColor: { control: "color" }
    }
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const WithPlaceholderAndValue = Template.bind({});
WithPlaceholderAndValue.args = {
    value: "12312",
    placeholder: "Input here"
};

export const Empty = Template.bind({});
Empty.args = {
    value: "",
    placeholder: "Input here"
};

export const Disabled = Template.bind({});
Disabled.args = {
    value: "12312",
    placeholder: "Input here",
    disabled: true
};

export const Dark = Template.bind({});
Dark.args = {
    value: "12312",
    placeholder: "Input here"
};
Dark.decorators = [ThemeDecorator(Theme.Dark)];
