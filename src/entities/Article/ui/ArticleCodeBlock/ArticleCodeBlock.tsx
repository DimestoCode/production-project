import { memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Code } from "@/shared/ui/deprecated/Code";
import { IArticleCodeBlock } from "../../model/types/IArticleBlock";
import classes from "./ArticleCodeBlock.module.scss";

interface ArticleCodeBlockProps {
    className?: string;
    block: IArticleCodeBlock;
}

export const ArticleCodeBlock = memo(({ className, block }: ArticleCodeBlockProps) => {
    return (
        <div className={classNames(classes.ArticleCodeBlock, {}, [className])}>
            <Code text={block.code} />
        </div>
    );
});
