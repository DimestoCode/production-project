let currentArticleId = "";
describe("User navigates to article details page", () => {
    beforeEach(() => {
        cy.login();
        cy.createArticle().then((article) => {
            currentArticleId = String(article.id);
            cy.visit(`articles/${article.id}`);
        });
    });

    afterEach(() => {
        cy.removeArticle(currentArticleId);
    });

    it("Sees its content rendered", () => {
        cy.getByTestId("ArticleDetails.Info").should("exist");
    });

    it("Sees the list of recommendations", () => {
        cy.getByTestId("ArticleRecommendations").should("exist");
    });

    it("Leaves the comment ", () => {
        cy.getByTestId("ArticleDetails.Info").should("exist");
        cy.getByTestId("AddCommentForm").scrollIntoView();
        cy.addComment("text");
        cy.getByTestId("CommentCard.Content").should("have.length", 1);
    });

    it.only("Put the rating", () => {
        cy.intercept("GET", "**/articles/*", { fixture: "article-details.json" });
        cy.getByTestId("ArticleDetails.Info").should("exist");
        cy.getByTestId("RatingCard").should("exist").scrollIntoView();

        cy.setRate(5);
        cy.get("[data-selected=true]").should("have.length", 5);
    });
});
