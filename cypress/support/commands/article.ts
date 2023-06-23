/* eslint-disable max-len */
import { IArticle } from "../../../src/entities/Article";

const defaultArticle = {
    title: "Javascript news",
    subtitle: "Что нового в JS за 2022 год?",
    img: "https://teknotower.com/wp-content/uploads/2020/11/js.png",
    views: 1022,
    createdAt: "26.02.2022",
    type: ["economics", "it"],
    userId: 1,
    blocks: [
        {
            id: 1,
            type: "TEXT",
            title: "Заголовок этого блока",
            paragraphs: [
                "The program traditionally called 'Hello, world!' is very simple. " +
                    "It outputs somewhere the phrase 'Hello, world!', or another similar phrase, by means of some language.",
                "JavaScript is a language that can be run in many different environments. " +
                    "In this case, we're talking about browsers and the Node.js server platform. If you haven't written a line of " +
                    "JS code so far and you're reading this text in a browser, on a desktop computer, " +
                    "that means you're literally seconds away from your first JavaScript program.",
                "There are other ways to run JS code in the browser. So, if we talk about the normal use of JavaScript programs, " +
                    "they are loaded into the browser to make the web pages work. " +
                    "Typically, the code takes the form of separate files with the extension .js, which are connected to the web " +
                    "pages, but the program code can be included directly in the code of the page. " +
                    "All this is done with the help of tag <script>. When the browser detects such code, it executes it. " +
                    "Details about the script tag can be found at w3school.com. In particular, let's look at an example on " +
                    "this site that uses JavaScript to handle a web page. You can run the example using this resource as well (look for the Try it Yourself button), but we are going to do something a little different. Namely, create in some text editor (for example, VS Code or Notepad++) a new file called hello.html and add the following code to it:"
            ]
        },
        {
            id: 4,
            type: "CODE",
            code: '<!DOCTYPE html>\n<html>\n  <body>\n    <p id="hello"></p>\n\n    <script>\n      document.getElementById("hello").innerHTML = "Hello, world!";\n    </script>\n  </body>\n</html>;'
        }
    ]
};
export const createArticle = (article?: IArticle) => {
    return cy
        .request({
            method: "POST",
            url: "http://localhost:8000/articles",
            headers: { Authorization: {} },
            body: article ?? defaultArticle
        })
        .then(({ body }) => body);
};

export const removeArticle = (articleId: string) => {
    return cy.request({
        method: "DELETE",
        url: `http://localhost:8000/articles/${articleId}`,
        headers: { Authorization: {} }
    });
};

declare global {
    namespace Cypress {
        interface Chainable {
            createArticle(article?: IArticle): Chainable<IArticle>;
            removeArticle(articleId: string): Chainable<void>;
        }
    }
}
