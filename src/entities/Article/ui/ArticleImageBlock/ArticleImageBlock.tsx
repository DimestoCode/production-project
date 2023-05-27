import { memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Text } from "@/shared/ui/Text/Text";
import { IArticleImageBlock } from "../../model/types/IArticleBlock";
import classes from "./ArticleImageBlock.module.scss";

interface ArticleImageBlockProps {
    className?: string;
    block: IArticleImageBlock;
}

export const ArticleImageBlock = memo(({ className, block }: ArticleImageBlockProps) => {
    return (
        <div className={classNames(classes.ArticleImageBlock, {}, [className])}>
            <img alt={block.title} className={classes.img} src={block.src} />
            {block.title && <Text align="center" text={block.title} />}
        </div>
    );
});
