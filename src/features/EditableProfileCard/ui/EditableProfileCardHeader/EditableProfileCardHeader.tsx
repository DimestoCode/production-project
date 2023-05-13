import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { classNames } from "shared/lib/classNames/classNames";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { HStack } from "shared/ui/Stack";
import { Text } from "shared/ui/Text/Text";
import { profileActions } from "../../model/slices/profileSlice";
import { getIsProfileFormEditable } from "../../model/selectors/getIsProfileFormEditable/getIsProfileFormEditable";
import { getProfileReadOnly } from "../../model/selectors/getProfileReadOnly/getProfileReadOnly";
import { updateProfileData } from "../../model/services/updateProfileData/updateProfileData";
import classes from "./EditableProfileCardHeader.module.scss";

interface EditableProfileCardHeaderProps {
    className?: string;
}

export const EditableProfileCardHeader = ({ className }: EditableProfileCardHeaderProps) => {
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
        <HStack className={classNames(classes.EditableProfileCardHeader, {}, [className])} justify="between" maxWidth>
            <Text title={t("Profile")} />

            {isEditable && (
                <div>
                    {readOnly ? (
                        <Button
                            data-testid="EditableProfileCardHeader.EditButton"
                            onClick={onEdit}
                            theme={ButtonTheme.Outline}
                        >
                            {t("Edit")}
                        </Button>
                    ) : (
                        <HStack gap="8">
                            <Button
                                data-testid="EditableProfileCardHeader.CancelButton"
                                onClick={onCancel}
                                theme={ButtonTheme.OutlineRed}
                            >
                                {t("Cancel")}
                            </Button>
                            <Button
                                data-testid="EditableProfileCardHeader.SaveButton"
                                onClick={onSave}
                                theme={ButtonTheme.Outline}
                            >
                                {t("Save")}
                            </Button>
                        </HStack>
                    )}
                </div>
            )}
        </HStack>
    );
};
