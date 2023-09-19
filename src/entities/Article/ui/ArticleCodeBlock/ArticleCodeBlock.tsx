import { memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Code as CodeDeprecated } from "@/shared/ui/deprecated/Code";
import { IArticleCodeBlock } from "../../model/types/IArticleBlock";
import classes from "./ArticleCodeBlock.module.scss";
import { ToggleFeatures } from "@/shared/lib/features";
import { Code } from "@/shared/ui/redesigned/Code";

interface ArticleCodeBlockProps {
    className?: string;
    block: IArticleCodeBlock;
}

export const ArticleCodeBlock = memo(({ className, block }: ArticleCodeBlockProps) => {
    return (
        <div className={classNames(classes.ArticleCodeBlock, {}, [className])}>
            <ToggleFeatures
                feature="isAppRedesigned"
                off={<CodeDeprecated text={block.code} />}
                on={<Code text={block.code} />}
            />
        </div>
    );
});
