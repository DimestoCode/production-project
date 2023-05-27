/* eslint-disable max-len */
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { rest } from "msw";
import { rtkApi } from "@/shared/api/rtkApi";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { ArticleBlockType, ArticleType, IArticle } from "@/entities/Article";
import { UserRole } from "@/entities/User";
import { ArticleRecommendationsList } from "./ArticleRecommendationsList";

const articles: IArticle[] = [
    {
        id: 1,
        title: "Javascript news dadwada dwadawda",
        subtitle: "Что нового в JS за 2022 год?",
        img: "https://teknotower.com/wp-content/uploads/2020/11/js.png",
        views: 1022,
        user: {
            roles: [UserRole.Admin],
            id: 1,
            username: "Dima",
            avatar: "https://i.pinimg.com/564x/d4/28/bb/d428bb4dff60cf6df9b282ce58efcade.jpg"
        },
        createdAt: "26.02.2022",
        type: [ArticleType.IT],
        blocks: [
            {
                id: 1,
                type: ArticleBlockType.Text,
                title: "Заголовок этого блока",
                paragraphs: [
                    'The program traditionally called "Hello, world!" is very simple. It outputs somewhere the phrase "Hello, world!", or another similar phrase, by means of some language.',
                    "JavaScript is a language that can be run in many different environments. In this case, we're talking about browsers and the Node.js server platform. If you haven't written a line of JS code so far and you're reading this text in a browser, on a desktop computer, that means you're literally seconds away from your first JavaScript program.",
                    "There are other ways to run JS code in the browser. So, if we talk about the normal use of JavaScript programs, they are loaded into the browser to make the web pages work. Typically, the code takes the form of separate files with the extension .js, which are connected to the web pages, but the program code can be included directly in the code of the page. All this is done with the help of tag <script>. When the browser detects such code, it executes it. Details about the script tag can be found at w3school.com. In particular, let's look at an example on this site that uses JavaScript to handle a web page. You can run the example using this resource as well (look for the Try it Yourself button), but we are going to do something a little different. Namely, create in some text editor (for example, VS Code or Notepad++) a new file called hello.html and add the following code to it:"
                ]
            }
        ]
    },
    {
        id: 2,
        title: "Javascript news dadwada dwadawda",
        subtitle: "Что нового в JS за 2022 год?",
        img: "https://teknotower.com/wp-content/uploads/2020/11/js.png",
        views: 1022,
        user: {
            roles: [UserRole.Admin, UserRole.Manager],
            id: 1,
            username: "Dima",
            avatar: "https://i.pinimg.com/564x/d4/28/bb/d428bb4dff60cf6df9b282ce58efcade.jpg"
        },
        createdAt: "26.02.2022",
        type: [ArticleType.IT],
        blocks: [
            {
                id: 1,
                type: ArticleBlockType.Text,
                title: "Заголовок этого блока",
                paragraphs: [
                    'The program traditionally called "Hello, world!" is very simple. It outputs somewhere the phrase "Hello, world!", or another similar phrase, by means of some language.',
                    "JavaScript is a language that can be run in many different environments. In this case, we're talking about browsers and the Node.js server platform. If you haven't written a line of JS code so far and you're reading this text in a browser, on a desktop computer, that means you're literally seconds away from your first JavaScript program.",
                    "There are other ways to run JS code in the browser. So, if we talk about the normal use of JavaScript programs, they are loaded into the browser to make the web pages work. Typically, the code takes the form of separate files with the extension .js, which are connected to the web pages, but the program code can be included directly in the code of the page. All this is done with the help of tag <script>. When the browser detects such code, it executes it. Details about the script tag can be found at w3school.com. In particular, let's look at an example on this site that uses JavaScript to handle a web page. You can run the example using this resource as well (look for the Try it Yourself button), but we are going to do something a little different. Namely, create in some text editor (for example, VS Code or Notepad++) a new file called hello.html and add the following code to it:"
                ]
            }
        ]
    }
];
export default {
    title: "features/ArticleRecommendationsList",
    component: ArticleRecommendationsList,
    argTypes: {
        backgroundColor: { control: "color" }
    },
    parameters: {
        msw: {
            handlers: [
                rest.get("/articles", (req, res, ctx) => {
                    return res(ctx.json(articles));
                })
            ]
        }
    }
} as ComponentMeta<typeof ArticleRecommendationsList>;

const Template: ComponentStory<typeof ArticleRecommendationsList> = (args) => <ArticleRecommendationsList {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [
    StoreDecorator({
        [rtkApi.reducerPath]: {
            queries: {
                getArticleRecommendationsList: {
                    data: []
                }
            }
        }
    })
];
