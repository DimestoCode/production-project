import { ComponentStory, ComponentMeta } from "@storybook/react";
import { StoreDecorator } from "shared/config/storybook/StoreDecorator/StoreDecorator";
import { action } from "@storybook/addon-actions";
import { AddCommentForm } from "./AddCommentForm";

export default {
    title: "features/AddCommentForm",
    component: AddCommentForm,
    argTypes: {
        backgroundColor: { control: "color" }
    }
} as ComponentMeta<typeof AddCommentForm>;

const Template: ComponentStory<typeof AddCommentForm> = (args) => <AddCommentForm {...args} />;

export const Empty = Template.bind({});
Empty.args = {
    onCommentSubmit: action("Submit Comment")
};
Empty.decorators = [StoreDecorator({ addCommentForm: {} })];

export const Filled = Template.bind({});
Filled.args = {
    onCommentSubmit: action("Submit Comment")
};
Filled.decorators = [StoreDecorator({ addCommentForm: { text: "Comment" } })];
