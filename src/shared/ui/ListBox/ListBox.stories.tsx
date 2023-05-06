import { action } from "@storybook/addon-actions";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ListBox } from "./ListBox";

export default {
    title: "shared/ListBox",
    component: ListBox,
    argTypes: {
        backgroundColor: { control: "color" }
    }
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => (
    <div style={{ paddingTop: 300 }}>
        <ListBox {...args} />
    </div>
);

export const WithLabel = Template.bind({});
WithLabel.args = {
    options: [
        {
            label: "Label 1",
            value: "1"
        },
        { label: "Label 2", value: "2" }
    ],
    label: "Label",
    defaultValue: "Select value",
    onChange: action("onchange")
};

export const WithoutLabel = Template.bind({});
WithoutLabel.args = {
    options: [
        {
            label: "Label 1",
            value: "1"
        },
        { label: "Label 2", value: "2" }
    ],
    defaultValue: "Select value",
    onChange: action("onchange")
};

export const Disabled = Template.bind({});
Disabled.args = {
    options: [
        {
            label: "Label 1",
            value: "1"
        },
        { label: "Label 2", value: "2" }
    ],
    label: "Label",
    defaultValue: "Select value",
    onChange: action("onchange"),
    disabled: true
};

export const DisabledOption = Template.bind({});
DisabledOption.args = {
    options: [
        {
            label: "Label 1",
            value: "1",
            disabled: true
        },
        { label: "Label 2", value: "2" }
    ],
    label: "Label",
    defaultValue: "Select value",
    onChange: action("onchange")
};

export const TopDropdown = Template.bind({});
TopDropdown.args = {
    options: [
        {
            label: "Label 1",
            value: "1"
        },
        { label: "Label 2", value: "2" }
    ],
    label: "Label",
    defaultValue: "Select value",
    direction: "top",

    onChange: action("onchange")
};
