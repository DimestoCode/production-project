/* eslint-disable max-len */
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { rest } from "msw";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import ArticleDetailsPage from "./ArticleDetailsPage";
import { ArticleBlockType, ArticleType, IArticle } from "@/entities/Article/testing";
import { UserRole } from "@/entities/User/testing";

const articleDetails: IArticle = {
    id: 1,
    title: "Javascript news",
    subtitle: "Что нового в JS за 2022 год?",
    img: "https://teknotower.com/wp-content/uploads/2020/11/js.png",
    views: 1022,
    createdAt: "26.02.2022",
    type: [ArticleType.IT],
    user: {
        id: 1,
        username: "Username",
        roles: [UserRole.Admin],
        avatar: ""
    },
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
        },
        {
            id: 4,
            type: ArticleBlockType.Code,
            code: '<!DOCTYPE html>\n<html>\n  <body>\n    <p id="hello"></p>\n\n    <script>\n      document.getElementById("hello").innerHTML = "Hello, world!";\n    </script>\n  </body>\n</html>;'
        },
        {
            id: 5,
            type: ArticleBlockType.Text,
            title: "Заголовок этого блока",
            paragraphs: [
                'The program traditionally called "Hello, world!" is very simple. It outputs somewhere the phrase "Hello, world!", or another similar phrase, by means of some language.',
                "There are other ways to run JS code in the browser. So, if we talk about the normal use of JavaScript programs, they are loaded into the browser to make the web pages work. Typically, the code takes the form of separate files with the extension .js, which are connected to the web pages, but the program code can be included directly in the code of the page. All this is done with the help of tag <script>. When the browser detects such code, it executes it. Details about the script tag can be found at w3school.com. In particular, let's look at an example on this site that uses JavaScript to handle a web page. You can run the example using this resource as well (look for the Try it Yourself button), but we are going to do something a little different. Namely, create in some text editor (for example, VS Code or Notepad++) a new file called hello.html and add the following code to it:"
            ]
        },
        {
            id: 2,
            type: ArticleBlockType.Image,
            src: "https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png",
            title: "Image 1 - Website screenshot"
        },
        {
            id: 3,
            type: ArticleBlockType.Code,
            code: "const path = require('path');\n\nconst server = jsonServer.create();\n\nconst router = jsonServer.router(path.resolve(__dirname, 'db.json'));\n\nserver.use(jsonServer.defaults({}));\nserver.use(jsonServer.bodyParser);"
        },
        {
            id: 7,
            type: ArticleBlockType.Text,
            title: "Title of this block",
            paragraphs: [
                "JavaScript is a language that can be run in many different environments. In our case, we're talking about browsers and the Node.js server platform. If you haven't written a line of JS code so far and you're reading this text in a browser, on a desktop computer, that means you're literally seconds away from your first JavaScript program.",
                "There are other ways to run JS code in the browser. So, if we talk about the normal use of JavaScript programs, they are loaded into the browser to make the web pages work. Typically, the code takes the form of separate files with the extension .js, which are connected to the web pages, but the program code can be included directly in the code of the page. All this is done with the help of tag <script>. When the browser detects such code, it executes it. Details about the script tag can be found at w3school.com. In particular, let's look at an example on this site that uses JavaScript to handle a web page. You can run the example using this resource as well (look for the Try it Yourself button), but we are going to do something a little different. Namely, create in some text editor (for example, VS Code or Notepad++) a new file called hello.html and add the following code to it:"
            ]
        },
        {
            id: 8,
            type: ArticleBlockType.Image,
            src: "https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png",
            title: "Image 1 - Website screenshot"
        },
        {
            id: 9,
            type: ArticleBlockType.Text,
            title: "Title of this block",
            paragraphs: [
                "JavaScript is a language that can be run in many different environments. In our case, we're talking about browsers and the Node.js server platform. If you haven't written a line of JS code so far and you're reading this text in a browser, on a desktop computer, it means you're literally seconds away from your first JavaScript program."
            ]
        }
    ]
};
export default {
    title: "pages/Article/ArticleDetailsPage",
    component: ArticleDetailsPage,
    parameters: {
        router: {
            path: "/articles/:articleId",
            route: "/articles/1"
        },
        msw: {
            handlers: [
                rest.get("/articles/1", (req, res, ctx) => {
                    return res(ctx.json(articleDetails));
                })
            ]
        }
    },
    decorators: [
        StoreDecorator({
            articleDetails: {
                data: articleDetails
            }
        })
    ],
    argTypes: {
        backgroundColor: { control: "color" }
    }
} as ComponentMeta<typeof ArticleDetailsPage>;

const Template: ComponentStory<typeof ArticleDetailsPage> = () => <ArticleDetailsPage />;

export const Normal = Template.bind({});
Normal.args = {};
