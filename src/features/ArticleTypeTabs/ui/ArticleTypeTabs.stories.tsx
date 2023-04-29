import { action } from "@storybook/addon-actions";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ArticleType } from "entities/Article";
import { ArticleTypeTabs } from "./ArticleTypeTabs";

export default {
    title: "features/ArticleTypeTabs",
    component: ArticleTypeTabs,
    argTypes: {
        backgroundColor: { control: "color" }
    }
} as ComponentMeta<typeof ArticleTypeTabs>;

const Template: ComponentStory<typeof ArticleTypeTabs> = (args) => <ArticleTypeTabs {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    onChangeType: action("Type changed"),
    value: ArticleType.IT
};
