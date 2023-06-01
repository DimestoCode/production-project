import { action } from "@storybook/addon-actions";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { StarRating } from "./StarRating";

export default {
    title: "$1/StarRating",
    component: StarRating,
    argTypes: {
        backgroundColor: { control: "color" }
    }
} as ComponentMeta<typeof StarRating>;

const Template: ComponentStory<typeof StarRating> = (args) => <StarRating {...args} />;

export const Empty = Template.bind({});
Empty.args = {
    selectedStars: 0,
    size: 50,
    onSelect: action("On Select")
};

export const ThreeSelected = Template.bind({});
ThreeSelected.args = {
    selectedStars: 3,
    size: 50
};
