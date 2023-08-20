import { memo } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "@/shared/ui/deprecated/Button";

interface ILangSwitcherProps {
    className?: string;
    short?: boolean;
}

export const LangSwitcher = memo(({ className = "", short }: ILangSwitcherProps) => {
    const { t, i18n } = useTranslation("common");

    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === "en" ? "ua" : "en");
    };

    return (
        <Button className={classNames("", {}, [className])} onClick={toggleLanguage} theme={ButtonTheme.Clear}>
            {t(short ? "LanguageAbbreviation" : "Language")}
        </Button>
    );
});
