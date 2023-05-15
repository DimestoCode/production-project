import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Page } from "widgets/Page";

const ForbiddenPage = memo(() => {
    const { t } = useTranslation("forbidden");

    return <Page>{t("You are forbidden to visit this page")}</Page>;
});

export default ForbiddenPage;
