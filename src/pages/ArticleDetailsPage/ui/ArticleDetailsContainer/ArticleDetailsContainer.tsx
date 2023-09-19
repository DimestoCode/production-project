import { memo } from "react";
import { useParams } from "react-router-dom";
import { Card } from "@/shared/ui/redesigned/Card";
import { ArticleDetails } from "@/entities/Article";

interface IArticleDetailsContainerProps {
    className?: string;
}

export const ArticleDetailsContainer = memo(({ className }: IArticleDetailsContainerProps) => {
    const { articleId } = useParams<{ articleId: string }>();

    return (
        <Card border="round" className={className} padding="24" fullHeight fullWidth>
            <ArticleDetails id={Number(articleId)} />
        </Card>
    );
});
