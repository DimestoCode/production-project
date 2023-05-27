import { memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Text } from "@/shared/ui/Text/Text";
import { IArticleTextBlock } from "../../model/types/IArticleBlock";
import classes from "./ArticleTextBlock.module.scss";

interface ArticleTextBlockProps {
    className?: string;
    block: IArticleTextBlock;
}

export const ArticleTextBlock = memo(({ className, block }: ArticleTextBlockProps) => {
    return (
        <div className={classNames(classes.ArticleTextBlock, {}, [className])}>
            {block.title && <Text className={classes.title} title={block.title} />}
            {block.paragraphs.map((paragraph) => (
                <Text className={classes.paragraph} key={paragraph} text={paragraph} />
            ))}
        </div>
    );
});
