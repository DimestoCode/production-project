import { ComponentStory, ComponentMeta } from "@storybook/react";
import { UserRole } from "@/entities/User/testing";
import { CommentCard } from "./CommentCard";
import { FeatureFlagsDecorator } from "@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator";

export default {
    title: "entities/Comment/CommentCard",
    component: CommentCard,
    argTypes: {
        backgroundColor: { control: "color" }
    }
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => <CommentCard {...args} />;

export const Deprecated = Template.bind({});
Deprecated.args = {
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

export const Redesigned = Template.bind({});
Redesigned.args = {
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
Redesigned.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })];
