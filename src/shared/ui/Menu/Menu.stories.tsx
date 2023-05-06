import { action } from "@storybook/addon-actions";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button } from "../Button/Button";
import { Menu } from "./Menu";

export default {
    title: "shared/Menu",
    component: Menu,
    argTypes: {
        backgroundColor: { control: "color" }
    }
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = (args) => <Menu {...args} />;
export const Normal = Template.bind({});
Normal.args = {
    items: [
        {
            label: "Leab",
            onClick: action("option 1")
        },
        {
            label: "Leab",
            onClick: action("option 1")
        }
    ],
    triggerEl: <Button>Open</Button>
};

// TODO: story cases for menu
