import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Theme } from "@/shared/const/theme";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import LoginForm from "./LoginForm";

export default {
    title: "features/LoginForm",
    component: LoginForm,
    argTypes: {
        backgroundColor: { control: "color" }
    }
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = (args) => <LoginForm {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [
    StoreDecorator({
        loginForm: { username: "admin", password: "123" }
    })
];
export const Error = Template.bind({});
Error.args = {};
Error.decorators = [
    StoreDecorator({
        loginForm: { username: "admin", password: "123", error: "Incorrect data" }
    })
];

export const Loading = Template.bind({});
Loading.args = {};
Loading.decorators = [
    StoreDecorator({
        loginForm: { isLoading: true }
    })
];

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {};
PrimaryDark.decorators = [
    StoreDecorator({
        loginForm: { username: "admin", password: "123" }
    }),
    ThemeDecorator(Theme.Dark)
];
export const ErrorDark = Template.bind({});
ErrorDark.args = {};
ErrorDark.decorators = [
    StoreDecorator({
        loginForm: { username: "admin", password: "123", error: "Incorrect data" }
    }),
    ThemeDecorator(Theme.Dark)
];

export const LoadingDark = Template.bind({});
LoadingDark.args = {};
LoadingDark.decorators = [
    StoreDecorator({
        loginForm: { isLoading: true }
    }),
    ThemeDecorator(Theme.Dark)
];
