import { ComponentStory, ComponentMeta } from "@storybook/react";
import { UserRole } from "@/entities/User/testing";
import { CommentList } from "./CommentList";

export default {
    title: "entities/Comment/CommentList",
    component: CommentList,
    argTypes: {
        backgroundColor: { control: "color" }
    }
} as ComponentMeta<typeof CommentList>;

const Template: ComponentStory<typeof CommentList> = (args) => <CommentList {...args} />;

export const Empty = Template.bind({});
Empty.args = {
    comments: [],
    isLoading: false
};

export const Normal = Template.bind({});
Normal.args = {
    comments: [
        { id: 1, text: "text", user: { id: 1, username: "User", avatar: "src/", roles: [UserRole.Admin] } },
        { id: 2, text: "text 2", user: { id: 1, username: "User", roles: [UserRole.Admin] } }
    ],
    isLoading: false
};
