import { memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Text as TextDeprecated } from "@/shared/ui/deprecated/Text";
import { IArticleTextBlock } from "../../model/types/IArticleBlock";
import classes from "./ArticleTextBlock.module.scss";
import { toggleFeatures } from "@/shared/lib/features";
import { Text } from "@/shared/ui/redesigned/Text";

interface ArticleTextBlockProps {
    className?: string;
    block: IArticleTextBlock;
}

export const ArticleTextBlock = memo(({ className, block }: ArticleTextBlockProps) => {
    const TextComponent = toggleFeatures({ name: "isAppRedesigned", off: () => TextDeprecated, on: () => Text });

    return (
        <div className={classNames(classes.ArticleTextBlock, {}, [className])}>
            {block.title && <TextComponent className={classes.title} title={block.title} />}
            {block.paragraphs.map((paragraph) => (
                <TextComponent className={classes.paragraph} key={paragraph} text={paragraph} />
            ))}
        </div>
    );
});
