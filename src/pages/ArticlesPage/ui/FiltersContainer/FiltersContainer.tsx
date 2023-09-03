import { memo } from "react";
import { ArticlesFilters } from "@/widgets/ArticlesFilters";
import { useArticleFilters } from "../../lib/hooks/useArticleFilters";

interface IFIltersContainerProps {
    className?: string;
}

export const FiltersContainer = memo(({ className }: IFIltersContainerProps) => {
    const { onChangeOrder, onChangeSearch, onChangeSort, onChangeType, search, sortField, sortOrder, type } =
        useArticleFilters();
    return (
        <ArticlesFilters
            className={className}
            onChangeOrder={onChangeOrder}
            onChangeSearch={onChangeSearch}
            onChangeSort={onChangeSort}
            onChangeType={onChangeType}
            search={search}
            sortField={sortField}
            sortOrder={sortOrder}
            type={type}
        />
    );
});
