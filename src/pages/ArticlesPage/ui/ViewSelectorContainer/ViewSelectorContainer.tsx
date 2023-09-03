import { memo } from "react";
import { ArticleViewSelector } from "@/features/ArticleViewSelector";
import { useArticleFilters } from "../../lib/hooks/useArticleFilters";

export const ViewSelectorContainer = memo(() => {
    const { view, onChangeView } = useArticleFilters();

    return <ArticleViewSelector onViewClick={onChangeView} view={view} />;
});
