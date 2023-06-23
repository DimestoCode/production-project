describe("User opens list of the articles", () => {
    beforeEach(() => {
        cy.login().then(() => {
            cy.visit("articles");
        });
    });
    it("gets loaded successfully", () => {
        cy.getByTestId("ArticleList").should("exist");
        cy.getByTestId("ArticleListItem").should("have.length.greaterThan", 3);
    });

    it("gets loaded successfully using stubs", () => {
        cy.intercept("GET", "**/articles", { fixture: "articles.json" });
        cy.getByTestId("ArticleList").should("exist");
        cy.getByTestId("ArticleListItem").should("have.length.greaterThan", 3);
    });
});
