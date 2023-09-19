import { memo } from "react";
import { useTranslation } from "react-i18next";
import { IUser } from "@/entities/User";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { Avatar } from "@/shared/ui/redesigned/Avatar";
import { Text } from "@/shared/ui/redesigned/Text";
import { ArticleEditBtn } from "@/features/ArticleEditBtn";

interface IArticleMetaDataProps {
    className?: string;
    author: IUser;
    createdAt: string;
    views: number;
}

export const ArticleMetaData = memo(({ className, author, createdAt, views }: IArticleMetaDataProps) => {
    const { t } = useTranslation("article");
    return (
        <VStack className={className} gap="32">
            <HStack gap="8">
                <Avatar size={32} src={author.avatar} />
                <Text text={author.username} bold />
                <Text text={createdAt} />
            </HStack>

            <ArticleEditBtn />
            <Text
                text={t("{{count}} views", {
                    count: views
                })}
            />
        </VStack>
    );
});
