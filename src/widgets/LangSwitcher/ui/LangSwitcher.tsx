import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames";
import { Button } from "shared/ui/Button/Button";
import classes from "./LangSwitcher.module.scss";

interface LangSwitcherProps {
    className?: string;
}

export const LangSwitcher = ({ className }: LangSwitcherProps) => {
    const { t, i18n } = useTranslation();

    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === "en" ? "ua" : "en");
    };

    return (
        <Button className={classNames(classes.langSwitcher, {}, [className])} onClick={toggleLanguage}>
            {t("Language")}
        </Button>
    );
};
