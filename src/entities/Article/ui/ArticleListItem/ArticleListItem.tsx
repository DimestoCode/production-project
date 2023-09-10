import { memo } from "react";
import { IArticleListItemProps } from "../../model/types/IArticleItemProps";
import { ToggleFeatures } from "@/shared/lib/features";
import { ArticleListItemDeprecated } from "./deprecated/ArticledListItemDeprecated";
import { ArticleListItemRedesigned } from "./redesigned/ArticleListItemRedesigned";

export const ArticleListItem = memo((props: IArticleListItemProps) => {
    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={<ArticleListItemDeprecated {...props} />}
            on={<ArticleListItemRedesigned {...props} />}
        />
    );
});
