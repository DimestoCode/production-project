import { ComponentStory, ComponentMeta } from "@storybook/react";
import { UserRole } from "@/entities/User/testing";
import { CommentCard } from "./CommentCard";

export default {
    title: "entities/Comment/CommentCard",
    component: CommentCard,
    argTypes: {
        backgroundColor: { control: "color" }
    }
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => <CommentCard {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    comment: {
        id: 1,
        text: "Text",
        user: {
            id: 1,
            username: "Username",
            avatar: "../../../../shared/assets/tests/profile.jpg",
            roles: [UserRole.Admin]
        }
    }
};
