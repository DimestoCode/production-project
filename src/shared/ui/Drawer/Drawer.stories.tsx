import { action } from "@storybook/addon-actions";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AnimationProvider } from "@/shared/lib/components/AnimationProvider";
import { Drawer } from "./Drawer";

export default {
    title: "shared/Drawer",
    component: Drawer,
    argTypes: {
        backgroundColor: { control: "color" }
    }
} as ComponentMeta<typeof Drawer>;

const Template: ComponentStory<typeof Drawer> = (args) => (
    <AnimationProvider>
        <Drawer {...args} />
    </AnimationProvider>
);

export const OpenedDrawer = Template.bind({});
OpenedDrawer.args = {
    isOpen: true,
    onClose: action("close action"),
    children: "Some Text Here"
};
