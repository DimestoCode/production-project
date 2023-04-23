import { ComponentStory, ComponentMeta } from "@storybook/react";
import { IArticle } from "entities/Article";
import { ArticleType } from "entities/Article/model/types/IArticle";
import { ArticleBlockType } from "entities/Article/model/types/IArticleBlock";
import { StoreDecorator } from "shared/config/storybook/StoreDecorator/StoreDecorator";
import ArticlesPage from "./ArticlesPage";

export default {
    title: "pages/ArticlesPage",
    component: ArticlesPage,
    argTypes: {
        backgroundColor: { control: "color" }
    }
} as ComponentMeta<typeof ArticlesPage>;

const Template: ComponentStory<typeof ArticlesPage> = () => <ArticlesPage />;

const articles: DeepPartial<IArticle>[] = [
    {
        id: 4,
        title: "Frontend",
        subtitle: "Что нового в JS за 2022 год?",
        img: "https://s.dou.ua/img/announces/how-to-front-end-840.jpg",
        views: 1022,
        createdAt: "26.02.2022",
        type: [ArticleType.Economics],
        user: {
            id: 1
        },
        blocks: [
            {
                id: 2,
                type: ArticleBlockType.Image,
                src: "https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png",
                title: "Image 1 - Website screenshot"
            },
            {
                id: 9,
                type: ArticleBlockType.Text,
                title: "Title of this block",
                paragraphs: [
                    `JavaScript is a language that can be run in many different environments. 
                    In our case, we're talking about browsers and the Node.js server platform. If you haven't written 
                    a line of JS code so far and you're reading this 
                    text in a browser, on a desktop computer, it means you're literally seconds away from your first JavaScript program.`
                ]
            }
        ]
    },
    {
        id: 5,
        title: "Frontend",
        subtitle: "Что нового в JS за 2022 год?",
        img: "https://s.dou.ua/img/announces/how-to-front-end-840.jpg",
        views: 1022,
        createdAt: "26.02.2022",
        type: [ArticleType.IT],
        user: {
            id: 1
        },
        blocks: [
            {
                id: 2,
                type: ArticleBlockType.Image,
                src: "https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png",
                title: "Image 1 - Website screenshot"
            },
            {
                id: 9,
                type: ArticleBlockType.Text,
                title: "Title of this block",
                paragraphs: [
                    `JavaScript is a language that can be run in many different environments. 
                    In our case, we're talking about browsers and the Node.js server platform. If you haven't written 
                    a line of JS code so far and you're reading this 
                    text in a browser, on a desktop computer, it means you're literally seconds away from your first JavaScript program.`
                ]
            }
        ]
    }
];

export const LoadingGrid = Template.bind({});
LoadingGrid.args = {};
LoadingGrid.decorators = [
    StoreDecorator({
        articles: {
            isLoading: true,
            view: "grid",
            ids: [],
            entities: {}
        }
    })
];

export const LoadingList = Template.bind({});
LoadingList.args = {};
LoadingList.decorators = [
    StoreDecorator({
        articles: {
            isLoading: true,
            view: "list",
            ids: [],
            entities: {}
        }
    })
];

export const Grid = Template.bind({});
Grid.args = {};
Grid.decorators = [
    StoreDecorator({
        articles: {
            isLoading: false,
            view: "grid",
            hasMore: true,
            page: 1,
            limit: 9,
            ids: [4, 5],
            entities: {
                "4": articles[0],
                "5": articles[1]
            }
        }
    })
];

export const List = Template.bind({});
List.args = {};
List.decorators = [
    StoreDecorator({
        articles: {
            isLoading: false,
            view: "list",
            hasMore: true,
            page: 1,
            limit: 9,
            ids: [4, 5],
            entities: {
                "4": articles[0],
                "5": articles[1]
            }
        }
    })
];
