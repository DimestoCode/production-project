import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Select } from "./Select";

export default {
    title: "shared/Select",
    component: Select,
    argTypes: {
        backgroundColor: { control: "color" }
    },
    args: {
        to: "/"
    }
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    label: "Label",
    value: "first",
    options: [
        {
            title: "First",
            value: "first"
        },
        {
            title: "Second",
            value: "second"
        }
    ]
};
