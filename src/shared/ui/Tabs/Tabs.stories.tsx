import { action } from "@storybook/addon-actions";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Tabs } from "./Tabs";

export default {
    title: "shared/Tabs",
    component: Tabs,
    argTypes: {
        backgroundColor: { control: "color" }
    }
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    tabs: [
        {
            content: "Content 1",
            value: "tab1"
        },
        {
            content: "Content 2",
            value: "tab2"
        },
        {
            content: "Content 3",
            value: "tab3"
        }
    ],
    value: "tab2",
    onTabClick: action("onTabClick")
};
