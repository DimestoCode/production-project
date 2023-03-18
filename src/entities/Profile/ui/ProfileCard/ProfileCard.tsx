import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { classNames } from "shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import { Text } from "shared/ui/Text/Text";
import { getProfileData } from "../../model/selectors/getProfileData/getProfileData";
// import { getProfileError } from "../../model/selectors/getProfileError/getProfileError";
// import { getProfileIsLoading } from "../../model/selectors/getProfileIsLoading/getProfileIsLoading";
import classes from "./ProfileCard.module.scss";

interface ProfileCardProps {
    className?: string;
}

export const ProfileCard = ({ className }: ProfileCardProps) => {
    const { t } = useTranslation("profile");
    const profile = useSelector(getProfileData);
    // const error = useSelector(getProfileError);
    // const isLoading = useSelector(getProfileIsLoading);

    return (
        <div className={classNames(classes.ProfileCard, {}, [className])}>
            <div className={classes.header}>
                <Text title={t("Profile")} />
                <Button className={classes.button} theme={ButtonTheme.OUTLINE}>
                    {t("Edit")}
                </Button>
            </div>
            <div className={classes.data}>
                <Input className={classes.input} placeholder={t("Your first name")} value={profile?.firstName} />
                <Input className={classes.input} placeholder={t("Your last name")} value={profile?.lastName} />
            </div>
        </div>
    );
};
