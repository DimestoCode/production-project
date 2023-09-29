import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ArticleList } from "@/entities/Article";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Loader } from "@/shared/ui/deprecated/Loader";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { Text as TextDeprecated } from "@/shared/ui/deprecated/Text";
import { useGetArticleRecommendationsListQuery } from "../../api/articleRecommendationsApi";
import { toggleFeatures } from "@/shared/lib/features";
import { Text } from "@/shared/ui/redesigned/Text";

interface IArticleRecommendationsListProps {
    className?: string;
}

export const ArticleRecommendationsList = memo(({ className }: IArticleRecommendationsListProps) => {
    const { t } = useTranslation("article");
    const { isLoading, data: articles, error } = useGetArticleRecommendationsListQuery(3);

    const TextComponent = useMemo(() => {
        return toggleFeatures({ name: "isAppRedesigned", on: () => Text, off: () => TextDeprecated });
    }, []);

    return (
        <VStack className={classNames("", {}, [className])} data-testid="ArticleRecommendations" gap="8">
            <TextComponent size="L" title={t("Recommendations")} />
            {isLoading && <Loader />}
            {!isLoading && error && <TextComponent text={t("Recommendations can't be loaded")} />}
            {!isLoading && articles && <ArticleList articles={articles} target="_blank" viewMode="grid" />}
        </VStack>
    );
});
