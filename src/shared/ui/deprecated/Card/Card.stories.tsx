import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Text } from "../Text/Text";
import { Card, CardTheme } from "./Card";

export default {
    title: "shared/Card",
    component: Card,
    argTypes: {
        backgroundColor: { control: "color" }
    }
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    children: <Text text="text" title="title" />
};

export const Outlined = Template.bind({});
Outlined.args = {
    children: <Text text="text" title="title" />,
    theme: CardTheme.Outlined
};
