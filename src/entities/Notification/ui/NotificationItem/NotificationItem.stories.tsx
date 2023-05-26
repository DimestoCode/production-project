import { ComponentStory, ComponentMeta } from "@storybook/react";
import { NotificationItem } from "./NotificationItem";

export default {
    title: "entities/Notification/NotificationItem",
    component: NotificationItem,
    argTypes: {
        backgroundColor: { control: "color" }
    }
} as ComponentMeta<typeof NotificationItem>;

const Template: ComponentStory<typeof NotificationItem> = (args) => <NotificationItem {...args} />;

export const NotificationItemDefault = Template.bind({});
NotificationItemDefault.args = {
    notification: {
        description: "Description",
        id: 1,
        title: "Title"
    }
};

export const NotificationItemWithUrl = Template.bind({});
NotificationItemWithUrl.args = {
    notification: {
        description: "Description",
        id: 1,
        title: "Title",
        href: "https://google.com"
    }
};
