import { ComponentStory, ComponentMeta } from "@storybook/react";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { ArticleDetailsComments } from "./ArticleDetailsComments";

export default {
    title: "pages/Article/ArticleDetailsComments",
    component: ArticleDetailsComments,
    argTypes: {
        backgroundColor: { control: "color" }
    }
} as ComponentMeta<typeof ArticleDetailsComments>;

const Template: ComponentStory<typeof ArticleDetailsComments> = (args) => <ArticleDetailsComments {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    articleId: 1
};
Normal.decorators = [
    StoreDecorator({
        articleDetailsPage: {
            comments: {
                ids: [1, 2],
                entities: {
                    1: {
                        id: 1,
                        text: "Text",
                        user: {
                            username: "user"
                        }
                    },
                    2: {
                        id: 2,
                        text: "Text 2",
                        user: {
                            username: "user"
                        }
                    }
                }
            }
        }
    })
];
