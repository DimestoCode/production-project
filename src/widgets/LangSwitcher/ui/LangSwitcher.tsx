import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { Button, ThemeButton } from "shared/ui/Button/Button";

interface LangSwitcherProps {
    className?: string;
}

export const LangSwitcher = ({ className }: LangSwitcherProps) => {
    const { t, i18n } = useTranslation("common");

    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === "en" ? "ua" : "en");
    };

    return (
        <Button className={classNames("", {}, [className])} onClick={toggleLanguage} theme={ThemeButton.CLEAR}>
            {t("Language")}
        </Button>
    );
};
