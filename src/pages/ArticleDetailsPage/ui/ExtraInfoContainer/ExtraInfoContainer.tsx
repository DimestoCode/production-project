import { memo } from "react";
import { useSelector } from "react-redux";
import { ArticleMetaData } from "@/widgets/ArticleMetaData";
import { Card } from "@/shared/ui/redesigned/Card";
import { getArticleDetailsData } from "@/entities/Article";
import classes from "./ExtraInfoContainer.module.scss";

interface IExtraInfoContainerProps {
    className?: string;
}

export const ExtraInfoContainer = memo<IExtraInfoContainerProps>(({ className }: IExtraInfoContainerProps) => {
    const article = useSelector(getArticleDetailsData);

    if (!article) {
        return null;
    }
    return (
        <Card border="partial" className={classes.card} padding="24">
            <ArticleMetaData
                author={article.user}
                className={className}
                createdAt={article.createdAt}
                views={article.views}
            />
        </Card>
    );
});
