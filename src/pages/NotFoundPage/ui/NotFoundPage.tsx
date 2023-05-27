import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Page } from "@/widgets/Page";
import classes from "./NotFoundPage.module.scss";

interface INotFoundPageProps {
    className?: string;
}

export const NotFoundPage = ({ className = "" }: INotFoundPageProps) => {
    const { t } = useTranslation("common");
    return <Page className={classNames(classes.NotFoundPage, {}, [className])}>{t("Page not found")}</Page>;
};
