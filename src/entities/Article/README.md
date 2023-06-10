## Article

Description: Article is an entity which serves for article-related data representation.

#### Public API

 - Components:
`ArticleList`- component to display the list of articles;
`ArticleDetails` - component to show the data of certain article;
`ArticleViewSelector` - component to switch the view (List or Grid) of article representation;

 - Types: 
`IArticle` - interface that depicts Article entity;
`IArticleState` - interface that depicts state of Article slice in redux store;

 - Selectors:
`getArticleDetailsData` - selector get the data of particular article;

 - Enums:
`ArticleType` - enum of types that article might belongs to;
`ArticleSortField` - enum of article sorting fields;
`ArticleBlockType` - enum of article's content types.
