import { Avatar } from "@/shared/ui/deprecated/Avatar";
import classes from "../ArticleDetails.module.scss";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { Text } from "@/shared/ui/deprecated/Text";
import { Icon } from "@/shared/ui/deprecated/Icon";
import EyeIcon from "@/shared/assets/icons/eye.svg";
import CalendarIcon from "@/shared/assets/icons/calendar.svg";
import { useArticleDetailsData } from "../../../model/selectors/articleDetailsSelectors";
import { renderArticleBlock } from "../renderArticleBlock";

export const ArticleDetailsDeprecated = () => {
    const article = useArticleDetailsData();

    return (
        <>
            <HStack className={classes.avatarWrapper} justify="center" maxWidth>
                <Avatar className={classes.avatar} size={200} src={article?.img} />
            </HStack>
            <VStack data-testid="ArticleDetails.Info" gap="4">
                <Text className={classes.title} text={article?.subtitle} title={article?.title} />
                <HStack className={classes.articleInfo} gap="8">
                    <Icon Svg={EyeIcon} className={classes.icon} />
                    <Text text={String(article?.views)} />
                </HStack>

                <HStack className={classes.articleInfo} gap="8">
                    <Icon Svg={CalendarIcon} className={classes.icon} />
                    <Text text={article?.createdAt} />
                </HStack>
            </VStack>

            {article?.blocks.map(renderArticleBlock)}
        </>
    );
};
