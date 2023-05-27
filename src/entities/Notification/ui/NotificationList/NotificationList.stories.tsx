import { ComponentStory, ComponentMeta } from "@storybook/react";
import { rest } from "msw";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { INotification } from "../../model/types/INotification";
import { NotificationList } from "./NotificationList";

const notifications: INotification[] = [
    { description: "Description", id: 1, title: "Title", href: "https://google.com" },
    { description: "Description 2", id: 2, title: "Title 2" }
];
export default {
    title: "entities/Notification/NotificationList",
    component: NotificationList,
    argTypes: {
        backgroundColor: { control: "color" }
    },
    parameters: {
        msw: {
            handlers: [rest.get("/notifications", (req, res, ctx) => res(ctx.json(notifications)))]
        }
    }
} as ComponentMeta<typeof NotificationList>;

const Template: ComponentStory<typeof NotificationList> = (args) => <NotificationList {...args} />;

export const Normal = Template.bind({});

Normal.args = {};
Normal.decorators = [StoreDecorator({})];
