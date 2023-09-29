import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Button } from "@/shared/ui/redesigned/Button";
import { HStack } from "@/shared/ui/redesigned/Stack";
import { Text } from "@/shared/ui/redesigned/Text";
import { IProfileCardProps } from "../../../model/types/IProfileCardProps";
import classes from "../EditableProfileCardHeader.module.scss";
import { Card } from "@/shared/ui/redesigned/Card";

export const EditableProfileCardHeaderRedesigned = ({
    isEditable,
    onCancel,
    onEdit,
    onSave,
    readOnly,
    className
}: IProfileCardProps) => {
    const { t } = useTranslation("profile");

    return (
        <Card border="partial" padding="24" fullWidth>
            <HStack
                className={classNames(classes.EditableProfileCardHeader, {}, [className])}
                justify="between"
                maxWidth
            >
                <Text title={t("Profile")} />

                {isEditable && (
                    <div>
                        {readOnly ? (
                            <Button
                                data-testid="EditableProfileCardHeader.EditButton"
                                onClick={onEdit}
                                variant="outlined"
                            >
                                {t("Edit")}
                            </Button>
                        ) : (
                            <HStack gap="8">
                                <Button
                                    color="error"
                                    data-testid="EditableProfileCardHeader.CancelButton"
                                    onClick={onCancel}
                                    variant="outlined"
                                >
                                    {t("Cancel")}
                                </Button>
                                <Button
                                    color="success"
                                    data-testid="EditableProfileCardHeader.SaveButton"
                                    onClick={onSave}
                                    variant="outlined"
                                >
                                    {t("Save")}
                                </Button>
                            </HStack>
                        )}
                    </div>
                )}
            </HStack>
        </Card>
    );
};
