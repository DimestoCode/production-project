import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AppLoader } from "./AppLoader";

export default {
    title: "widgets/AppLoader",
    component: AppLoader,
    argTypes: {
        backgroundColor: { control: "color" }
    }
} as ComponentMeta<typeof AppLoader>;

const Template: ComponentStory<typeof AppLoader> = () => <AppLoader />;

export const Normal = Template.bind({});
Normal.args = {};
