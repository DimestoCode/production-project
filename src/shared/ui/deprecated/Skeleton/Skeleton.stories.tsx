import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Theme } from "@/shared/const/theme";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Skeleton } from "./Skeleton";

export default {
    title: "shared/Skeleton",
    component: Skeleton,
    argTypes: {
        backgroundColor: { control: "color" }
    }
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args) => <Skeleton {...args} />;

export const Rectangle = Template.bind({});
Rectangle.args = {
    width: "100%",
    height: 200
};

export const RectangleDark = Template.bind({});
RectangleDark.args = {
    width: "100%",
    height: 200
};
RectangleDark.decorators = [ThemeDecorator(Theme.Dark)];
