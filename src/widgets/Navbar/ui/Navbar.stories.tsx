import { ComponentStory, ComponentMeta } from "@storybook/react";

import { rest } from "msw";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@/app/providers/ThemeProvider";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { INotification } from "@/entities/Notification/model/types/INotification";
import { Navbar } from "./Navbar";

const notifications: INotification[] = [
    { description: "Description", id: 1, title: "Title", href: "https://google.com" },
    { description: "Description 2", id: 2, title: "Title 2" }
];

export default {
    title: "widgets/Navbar",
    component: Navbar,
    argTypes: {
        backgroundColor: { control: "color" }
    },
    parameters: {
        msw: {
            handlers: [rest.get("/notifications", (req, res, ctx) => res(ctx.json(notifications)))]
        }
    }
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />;

export const LightUnauthenticated = Template.bind({});
LightUnauthenticated.args = {};
LightUnauthenticated.decorators = [StoreDecorator({})];

export const DarkUnauthenticated = Template.bind({});
DarkUnauthenticated.args = {};
DarkUnauthenticated.decorators = [ThemeDecorator(Theme.Dark), StoreDecorator({})];

export const LightAuthenticated = Template.bind({});
LightAuthenticated.args = {};
LightAuthenticated.decorators = [
    StoreDecorator({
        user: {
            authData: {
                username: "Test"
            }
        }
    })
];

export const DarkAuthenticated = Template.bind({});
DarkAuthenticated.args = {};
DarkAuthenticated.decorators = [
    ThemeDecorator(Theme.Dark),
    StoreDecorator({
        user: {
            authData: {
                username: "Test"
            }
        }
    })
];
