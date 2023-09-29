import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "@/shared/ui/deprecated/Button";
import { HStack } from "@/shared/ui/redesigned/Stack";
import classes from "../EditableProfileCardHeader.module.scss";
import { Text } from "@/shared/ui/deprecated/Text";
import { IProfileCardProps } from "../../../model/types/IProfileCardProps";

export const EditableProfileCardHeaderDeprecated = ({
    isEditable,
    onCancel,
    onEdit,
    onSave,
    readOnly,
    className
}: IProfileCardProps) => {
    const { t } = useTranslation("profile");

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
