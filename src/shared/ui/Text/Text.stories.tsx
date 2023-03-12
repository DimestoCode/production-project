import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Theme } from "app/providers/ThemeProvider";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Text, TextTheme } from "./Text";

export default {
    title: "shared/Text",
    component: Text,
    argTypes: {
        backgroundColor: { control: "color" }
    }
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const WithTitle = Template.bind({});
WithTitle.args = {
    title: "title"
};

export const WithText = Template.bind({});
WithText.args = {
    text: "text"
};

export const WithTitleAndText = Template.bind({});
WithTitleAndText.args = {
    title: "title",
    text: "text"
};

export const WithTitleDark = Template.bind({});
WithTitleDark.args = {
    title: "title"
};
WithTitleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const WithTextDark = Template.bind({});
WithTextDark.args = {
    text: "text"
};
WithTextDark.decorators = [ThemeDecorator(Theme.DARK)];

export const WithTitleAndTextDark = Template.bind({});
WithTitleAndTextDark.args = {
    title: "title",
    text: "text"
};
WithTitleAndTextDark.decorators = [ThemeDecorator(Theme.DARK)];

export const PrimaryTheme = Template.bind({});
PrimaryTheme.args = {
    title: "Title",
    text: "text",
    theme: TextTheme.PRIMARY
};

export const ErrorTheme = Template.bind({});
ErrorTheme.args = {
    title: "title",
    text: "text",
    theme: TextTheme.ERROR
};
