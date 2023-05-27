import { ComponentStory, ComponentMeta } from "@storybook/react";
import { rest } from "msw";
import { INotification } from "@/entities/Notification/model/types/INotification";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { NotificationButton } from "./NotificationButton";

const notifications: INotification[] = [
    { description: "Description", id: 1, title: "Title", href: "https://google.com" },
    { description: "Description 2", id: 2, title: "Title 2" }
];
export default {
    title: "features/NotificationButton",
    component: NotificationButton,
    argTypes: {
        backgroundColor: { control: "color" }
    },
    parameters: {
        msw: {
            handlers: [rest.get("/notifications", (req, res, ctx) => res(ctx.json(notifications)))]
        }
    }
} as ComponentMeta<typeof NotificationButton>;

const Template: ComponentStory<typeof NotificationButton> = () => (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <NotificationButton />
    </div>
);

export const Normal = Template.bind({});
Normal.decorators = [StoreDecorator({})];
