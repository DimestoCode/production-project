import { memo, useMemo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Text as TextDeprecated } from "@/shared/ui/deprecated/Text";
import { Text } from "@/shared/ui/redesigned/Text";
import { IArticleImageBlock } from "../../model/types/IArticleBlock";
import { toggleFeatures } from "@/shared/lib/features";
import classes from "./ArticleImageBlock.module.scss";

interface ArticleImageBlockProps {
    className?: string;
    block: IArticleImageBlock;
}

export const ArticleImageBlock = memo(({ className, block }: ArticleImageBlockProps) => {
    const TextComponent = useMemo(
        () => toggleFeatures({ name: "isAppRedesigned", off: () => TextDeprecated, on: () => Text }),
        []
    );

    return (
        <div className={classNames(classes.ArticleImageBlock, {}, [className])}>
            <img alt={block.title} className={classes.img} src={block.src} />
            {block.title && <TextComponent align="center" text={block.title} />}
        </div>
    );
});
