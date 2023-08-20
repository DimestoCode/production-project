import { memo } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Button } from "@/shared/ui/deprecated/Button";
import classes from "./PageError.module.scss";

interface IPageErrorProps {
    className?: string;
}

export const PageError = memo(({ className = "" }: IPageErrorProps) => {
    const { t } = useTranslation("common");

    const refreshPage = () => {
        window.location.reload();
    };
    return (
        <div className={classNames(classes.PageError, {}, [className])}>
            <p>{t("Something went wrong")}</p>
            <Button onClick={refreshPage}>{t("Refresh page")}</Button>
        </div>
    );
});
