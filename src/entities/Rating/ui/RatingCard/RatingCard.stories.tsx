import { action } from "@storybook/addon-actions";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { RatingCard } from "./RatingCard";

export default {
    title: "entities/Rating/RatingCard",
    component: RatingCard,
    argTypes: {
        backgroundColor: { control: "color" }
    }
} as ComponentMeta<typeof RatingCard>;

const Template: ComponentStory<typeof RatingCard> = (args) => <RatingCard {...args} />;

export const WithFeedback = Template.bind({});
WithFeedback.args = {
    feedbackTitle: "Title",
    onAccept: action("Accept"),
    onCancel: action("Cancel"),
    title: "Title",
    withFeedback: true
};
