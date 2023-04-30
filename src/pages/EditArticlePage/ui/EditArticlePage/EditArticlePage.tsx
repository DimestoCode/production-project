import { memo } from "react";
import { useParams } from "react-router-dom";
import { Page } from "widgets/Page";

// TODO: Add edit/add article form
const EditArticlePage = memo(() => {
    const { articleId } = useParams<{ articleId: string }>();

    const isEdit = Boolean(articleId);

    return <Page>{isEdit ? "Edit Article" : "Add Article"}</Page>;
});

export default EditArticlePage;
