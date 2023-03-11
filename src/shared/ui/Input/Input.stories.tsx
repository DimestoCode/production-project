import { ComponentStory, ComponentMeta } from "@storybook/react";

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
