import { ComponentStory, ComponentMeta } from "@storybook/react";

import { rest } from "msw";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@/shared/const/theme";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { Navbar } from "./Navbar";
import { INotification } from "@/entities/Notification/testing";

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
    },
    decorators: [
        StoreDecorator({
            user: {
                authData: {
                    id: 1,
                    features: {
                        isAppRedesigned: false
                    },
                    username: "Test"
                }
            }
        })
    ]
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />;

export const LightUnauthenticated = Template.bind({});
LightUnauthenticated.args = {};

export const DarkUnauthenticated = Template.bind({});
DarkUnauthenticated.args = {};
DarkUnauthenticated.decorators = [ThemeDecorator(Theme.Dark)];

export const LightAuthenticated = Template.bind({});
LightAuthenticated.args = {};

export const DarkAuthenticated = Template.bind({});
DarkAuthenticated.args = {};
DarkAuthenticated.decorators = [ThemeDecorator(Theme.Dark)];
