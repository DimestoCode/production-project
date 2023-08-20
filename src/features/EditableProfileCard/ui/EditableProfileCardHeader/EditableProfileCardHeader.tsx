import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Button, ButtonTheme } from "@/shared/ui/deprecated/Button";
import { HStack } from "@/shared/ui/deprecated/Stack";
import { Text } from "@/shared/ui/deprecated/Text";
import { useProfileActions } from "../../model/slices/profileSlice";
import { getIsProfileFormEditable } from "../../model/selectors/getIsProfileFormEditable/getIsProfileFormEditable";
import { useProfileReadOnly } from "../../model/selectors/getProfileReadOnly/getProfileReadOnly";
import { updateProfileData } from "../../model/services/updateProfileData/updateProfileData";
import classes from "./EditableProfileCardHeader.module.scss";

interface EditableProfileCardHeaderProps {
    className?: string;
}

export const EditableProfileCardHeader = ({ className }: EditableProfileCardHeaderProps) => {
    const { t } = useTranslation("profile");
    const readOnly = useProfileReadOnly();
    const isEditable = useSelector(getIsProfileFormEditable);
    const dispatch = useAppDispatch();
    const { cancelEdit, setReadOnly } = useProfileActions();

    const onEdit = useCallback(() => {
        setReadOnly(false);
    }, [setReadOnly]);

    const onCancel = useCallback(() => {
        cancelEdit();
    }, [cancelEdit]);

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
