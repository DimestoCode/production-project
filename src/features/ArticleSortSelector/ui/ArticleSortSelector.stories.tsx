import { action } from "@storybook/addon-actions";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ArticleSortField } from "entities/Article";
import { ArticleSortSelector } from "./ArticleSortSelector";

export default {
    title: "features/ArticleSortSelector",
    component: ArticleSortSelector,
    argTypes: {
        backgroundColor: { control: "color" }
    }
} as ComponentMeta<typeof ArticleSortSelector>;

const Template: ComponentStory<typeof ArticleSortSelector> = (args) => <ArticleSortSelector {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    onChangeOrder: action("order change"),
    onChangeSort: action("sort field change"),
    order: "asc",
    sort: ArticleSortField.Title
};
