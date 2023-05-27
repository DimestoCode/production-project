import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ArticleType } from "@/entities/Article";
import { ITabItem, Tabs } from "@/shared/ui/Tabs/Tabs";

interface IArticleTypeTabsProps {
    className?: string;
    onChangeType: (tabItem: ITabItem) => void;
    value: ArticleType;
}

export const ArticleTypeTabs = memo(({ className, value, onChangeType }: IArticleTypeTabsProps) => {
    const { t } = useTranslation("articles");

    const typeTabs = useMemo<ITabItem[]>(() => {
        return Object.entries(ArticleType).map(([key, value]) => ({
            content: t(key),
            value
        }));
    }, [t]);

    return <Tabs className={className} onTabClick={onChangeType} tabs={typeTabs} value={value} />;
});
