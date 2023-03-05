import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import classes from "./NotFoundPage.module.scss";

interface INotFoundPageProps {
    className?: string;
}

export const NotFoundPage = ({ className = "" }: INotFoundPageProps) => {
    const { t } = useTranslation("common");
    return <div className={classNames(classes.NotFoundPage, {}, [className])}>{t("Page not found")}</div>;
};
