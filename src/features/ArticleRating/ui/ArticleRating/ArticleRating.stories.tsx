import { ComponentStory, ComponentMeta } from "@storybook/react";
import { rest } from "msw";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import ArticleRating from "./ArticleRating";

export default {
    title: "features/ArticleRating",
    component: ArticleRating,
    argTypes: {
        backgroundColor: { control: "color" }
    },
    decorators: [StoreDecorator({})],
    parameters: {
        msw: {
            handlers: [
                rest.get("/article-ratings", (req, res, ctx) => {
                    console.log(req);
                    if (Number(req.url.searchParams.get("userId")) === 0) {
                        return res(
                            ctx.json([
                                {
                                    rate: 3,
                                    feedback: "Nicely Done"
                                }
                            ])
                        );
                    }

                    return res();
                })
            ]
        }
    }
} as ComponentMeta<typeof ArticleRating>;

const Template: ComponentStory<typeof ArticleRating> = (args) => <ArticleRating {...args} />;

export const Filled = Template.bind({});
Filled.args = {};

export const Empty = Template.bind({});
Empty.args = {
    articleId: 1
};

Empty.decorators = [
    StoreDecorator({
        user: {
            authData: {
                id: 1
            }
        }
    })
];
