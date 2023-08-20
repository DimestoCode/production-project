import { action } from "@storybook/addon-actions";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ListBox } from "./ListBox";

export default {
    title: "shared/ListBox",
    component: ListBox,
    argTypes: {
        backgroundColor: { control: "color" }
    },
    decorators: [
        (Story) => (
            <div style={{ padding: 100 }}>
                <Story />{" "}
            </div>
        )
    ]
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

export const TopLeftDropdown = Template.bind({});
TopLeftDropdown.args = {
    options: [
        {
            label: "Label 1",
            value: "1"
        },
        { label: "Label 2", value: "2" }
    ],
    label: "Label",
    defaultValue: "Select value",
    direction: "top-left",

    onChange: action("onchange")
};

export const TopRightDropdown = Template.bind({});
TopRightDropdown.args = {
    options: [
        {
            label: "Label 1 dawdaw",
            value: "1"
        },
        { label: "Label 2 dawdawdawda", value: "2" }
    ],
    label: "Label",
    defaultValue: "Select value",
    direction: "top-right",

    onChange: action("onchange")
};
export const BottomLeftDropdown = Template.bind({});
BottomLeftDropdown.args = {
    options: [
        {
            label: "Label 1 dwa dawdawd",
            value: "1"
        },
        { label: "Label 2 dadwawdawda", value: "2" }
    ],
    label: "Label",
    defaultValue: "Select value",
    direction: "bottom-left",

    onChange: action("onchange")
};

export const BottomRightDropdown = Template.bind({});
BottomRightDropdown.args = {
    options: [
        {
            label: "Label 1 dwa dawdawd",
            value: "1"
        },
        { label: "Label 2 dadwawdawda", value: "2" }
    ],
    label: "Label",
    defaultValue: "Select value",
    direction: "bottom-right",

    onChange: action("onchange")
};
