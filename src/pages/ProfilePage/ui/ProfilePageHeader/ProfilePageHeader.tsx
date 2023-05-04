import { getProfileReadOnly, profileActions, updateProfileData } from "entities/Profile";
import { getIsProfileFormEditable } from "features/EditableProfileCard/model/selectors/getIsProfileFormEditable";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { classNames } from "shared/lib/classNames/classNames";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { HStack } from "shared/ui/Stack";
import { Text } from "shared/ui/Text/Text";
import classes from "./ProfilePageHeader.module.scss";

interface ProfilePageHeaderProps {
    className?: string;
}

export const ProfilePageHeader = ({ className }: ProfilePageHeaderProps) => {
    const { t } = useTranslation("profile");
    const dispatch = useAppDispatch();
    const readOnly = useSelector(getProfileReadOnly);
    const isEditable = useSelector(getIsProfileFormEditable);

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
        <HStack className={classNames(classes.ProfilePageHeader, {}, [className])} justify="between" maxWidth>
            <Text title={t("Profile")} />

            {isEditable && (
                <div>
                    {readOnly ? (
                        <Button onClick={onEdit} theme={ButtonTheme.Outline}>
                            {t("Edit")}
                        </Button>
                    ) : (
                        <HStack gap="8">
                            <Button onClick={onCancel} theme={ButtonTheme.OutlineRed}>
                                {t("Cancel")}
                            </Button>
                            <Button onClick={onSave} theme={ButtonTheme.Outline}>
                                {t("Save")}
                            </Button>
                        </HStack>
                    )}
                </div>
            )}
        </HStack>
    );
};
