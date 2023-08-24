import { memo } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Button as ButtonDeprecated, ButtonTheme } from "@/shared/ui/deprecated/Button";
import { ToggleFeatures } from "@/shared/lib/features";
import { Button } from "@/shared/ui/redesigned/Button";

interface ILangSwitcherProps {
    className?: string;
    short?: boolean;
}

export const LangSwitcher = memo(({ className = "", short }: ILangSwitcherProps) => {
    const { t, i18n } = useTranslation("common");

    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === "en" ? "ua" : "en");
    };

    const translationKey = short ? "LanguageAbbreviation" : "Language";

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <ButtonDeprecated
                    className={classNames("", {}, [className])}
                    onClick={toggleLanguage}
                    theme={ButtonTheme.Clear}
                >
                    {t(translationKey)}
                </ButtonDeprecated>
            }
            on={
                <Button onClick={toggleLanguage} variant="clear">
                    {t(translationKey)}
                </Button>
            }
        />
    );
});
