import { IArticleBlock } from "../../model/types/IArticleBlock";
import { ArticleBlockType } from "../../testing";
import { ArticleCodeBlock } from "../ArticleCodeBlock/ArticleCodeBlock";
import { ArticleImageBlock } from "../ArticleImageBlock/ArticleImageBlock";
import { ArticleTextBlock } from "../ArticleTextBlock/ArticleTextBlock";
import classes from "./ArticleDetails.module.scss";

export function renderArticleBlock(block: IArticleBlock) {
    switch (block.type) {
        case ArticleBlockType.Code:
            return <ArticleCodeBlock block={block} className={classes.block} key={block.id} />;
        case ArticleBlockType.Image:
            return <ArticleImageBlock block={block} className={classes.block} key={block.id} />;
        case ArticleBlockType.Text:
            return <ArticleTextBlock block={block} className={classes.block} key={block.id} />;
        default:
            return null;
    }
}
