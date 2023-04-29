import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ArticleSortField } from "entities/Article";
import { StoreDecorator } from "shared/config/storybook/StoreDecorator/StoreDecorator";
import { ArticlesPageFilters } from "./ArticlesPageFilters";

export default {
    title: "pages/ArticlesPageFilters",
    component: ArticlesPageFilters,
    argTypes: {
        backgroundColor: { control: "color" }
    }
} as ComponentMeta<typeof ArticlesPageFilters>;

const Template: ComponentStory<typeof ArticlesPageFilters> = (args) => <ArticlesPageFilters {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [
    StoreDecorator({
        articles: {
            order: "asc",
            page: 1,
            sort: ArticleSortField.CreatedAt,
            view: "grid",
            hasMore: false,
            initialized: true,
            isLoading: false
        }
    })
];
