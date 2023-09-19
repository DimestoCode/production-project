import { renderArticleBlock } from "../renderArticleBlock";
import { Text } from "@/shared/ui/redesigned/Text";
import classes from "../ArticleDetails.module.scss";
import { useArticleDetailsData } from "../../../model/selectors/articleDetailsSelectors";
import { AppImage } from "@/shared/ui/redesigned/AppImage/AppImage";
import { Skeleton } from "@/shared/ui/redesigned/Skeleton";

export const ArticleDetailsRedesigned = () => {
    const article = useArticleDetailsData();

    return (
        <>
            <Text size="L" title={article?.title} bold />
            <Text title={article?.subtitle} />
            <AppImage
                className={classes.img}
                fallback={<Skeleton borderRadius="16" height={420} width="100%" />}
                src={article?.img}
            />

            {article?.blocks.map(renderArticleBlock)}
        </>
    );
};
