import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ProfileCard } from "@/entities/Profile";
import { useActionEffect } from "@/shared/lib/hooks/useActionEffect/useActionEffect";
import { Reducers, useDynamicModuleLoader } from "@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { Text as TextDeprecated, TextTheme } from "@/shared/ui/deprecated/Text";
import { retrieveProfileData } from "../../model/services/retrieveProfileData/retrieveProfileData";
import { useProfileError } from "../../model/selectors/getProfileError/getProfileError";
import { useProfileForm } from "../../model/selectors/getProfileForm/getProfileForm";
import { useProfileIsLoading } from "../../model/selectors/getProfileIsLoading/getProfileIsLoading";
import { useProfileReadOnly } from "../../model/selectors/getProfileReadOnly/getProfileReadOnly";
import { useProfileValidationErrors } from "../../model/selectors/getProfileValidationErrors/getProfileValidationErrors";
import { profileReducer, useProfileActions } from "../../model/slices/profileSlice";
import { EditableProfileCardHeader } from "../EditableProfileCardHeader/EditableProfileCardHeader";
import { ToggleFeatures } from "@/shared/lib/features";
import { Text } from "@/shared/ui/redesigned/Text";

interface IEditableProfileCardProps {
    profileId: number;
}

const reducers: Reducers = {
    profile: profileReducer
};

export const EditableProfileCard = memo(({ profileId }: IEditableProfileCardProps) => {
    const { t } = useTranslation("profile");
    const fetchProfileCallback = useCallback(() => retrieveProfileData(Number(profileId)), [profileId]);

    useDynamicModuleLoader({ reducers, removeOnUnmount: true });
    useActionEffect(fetchProfileCallback);

    const { updateProfile } = useProfileActions();

    const formData = useProfileForm();
    const error = useProfileError();
    const isLoading = useProfileIsLoading();
    const readOnly = useProfileReadOnly();
    const validationErrors = useProfileValidationErrors();

    const onInputChange = useCallback(
        (value: string, name: string) => {
            updateProfile({ [name]: value ?? "" });
        },
        [updateProfile]
    );

    const onInputNumberChange = useCallback(
        (value: string, name: string) => {
            updateProfile({ [name]: value ? +value : "" });
        },
        [updateProfile]
    );

    const onSelectChange = useCallback(
        <T extends string>(value: T, name: string) => {
            updateProfile({ [name]: value });
        },
        [updateProfile]
    );

    return (
        <VStack gap="16" maxWidth>
            <EditableProfileCardHeader />
            {!!validationErrors?.length &&
                validationErrors.map((error) => (
                    <ToggleFeatures
                        feature="isAppRedesigned"
                        key={error}
                        off={
                            <TextDeprecated
                                data-testid="EditableProfileCard.Error"
                                text={t(error)}
                                theme={TextTheme.Error}
                            />
                        }
                        on={<Text data-testid="EditableProfileCard.Error" text={t(error)} variant="error" />}
                    />
                ))}
            <ProfileCard
                data={formData}
                error={error}
                isLoading={isLoading}
                onInputChange={onInputChange}
                onInputNumberChange={onInputNumberChange}
                onSelectChange={onSelectChange}
                readOnly={readOnly}
            />
        </VStack>
    );
});
