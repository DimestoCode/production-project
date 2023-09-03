import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ArticleType } from "@/entities/Article";
import { ITabItem, Tabs as TabsDeprecated } from "@/shared/ui/deprecated/Tabs";
import { ToggleFeatures } from "@/shared/lib/features";
import { Tabs } from "@/shared/ui/redesigned/Tabs";

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

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={<TabsDeprecated className={className} onTabClick={onChangeType} tabs={typeTabs} value={value} />}
            on={
                <Tabs
                    align="start"
                    className={className}
                    direction="column"
                    onTabClick={onChangeType}
                    tabs={typeTabs}
                    value={value}
                />
            }
        />
    );
});
