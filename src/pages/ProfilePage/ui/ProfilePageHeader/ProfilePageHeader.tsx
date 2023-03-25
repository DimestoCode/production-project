import { getProfileReadOnly, profileActions, updateProfileData } from "entities/Profile";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { classNames } from "shared/lib/classNames/classNames";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Text } from "shared/ui/Text/Text";
import classes from "./ProfilePageHeader.module.scss";

interface ProfilePageHeaderProps {
    className?: string;
}

export const ProfilePageHeader = ({ className }: ProfilePageHeaderProps) => {
    const { t } = useTranslation("profile");
    const dispatch = useAppDispatch();

    const readOnly = useSelector(getProfileReadOnly);

    const onEdit = useCallback(() => {
        dispatch(profileActions.setReadOnly(false));
    }, [dispatch]);

    const onCancel = useCallback(() => {
        dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const onSave = useCallback(() => {
        dispatch(updateProfileData());
    }, [dispatch]);

    return (
        <div className={classNames(classes.ProfilePageHeader, {}, [className])}>
            <Text title={t("Profile")} />

            {readOnly ? (
                <Button className={classes.button} onClick={onEdit} theme={ButtonTheme.Outline}>
                    {t("Edit")}
                </Button>
            ) : (
                <>
                    <Button className={classes.button} onClick={onCancel} theme={ButtonTheme.OutlineRed}>
                        {t("Cancel")}
                    </Button>
                    <Button className={classes.button} onClick={onSave} theme={ButtonTheme.Outline}>
                        {t("Save")}
                    </Button>
                </>
            )}
        </div>
    );
};
