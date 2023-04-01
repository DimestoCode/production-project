export enum ArticleBlockType {
    Code = "CODE",
    Image = "IMAGE",
    Text = "TEXT"
}

export interface IArticleBlockBase {
    id: number;
    type: ArticleBlockType;
}

export interface IArticleTextBlock extends IArticleBlockBase {
    type: ArticleBlockType.Text;
    title?: string;
    paragraphs: string[];
}

export interface IArticleImageBlock extends IArticleBlockBase {
    type: ArticleBlockType.Image;
    src: string;
    title: string;
}

export interface IArticleCodeBlock extends IArticleBlockBase {
    type: ArticleBlockType.Code;
    code: string;
}
export type IArticleBlock = IArticleCodeBlock | IArticleTextBlock | IArticleImageBlock;
