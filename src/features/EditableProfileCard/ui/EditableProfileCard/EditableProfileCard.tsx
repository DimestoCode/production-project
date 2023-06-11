import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { ProfileCard } from "@/entities/Profile";
import { useActionEffect } from "@/shared/lib/hooks/useActionEffect/useActionEffect";
import { Reducers, useDynamicModuleLoader } from "@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader";
import { VStack } from "@/shared/ui/Stack";
import { Text, TextTheme } from "@/shared/ui/Text";
import { retrieveProfileData } from "../../model/services/retrieveProfileData/retrieveProfileData";
import { getProfileError } from "../../model/selectors/getProfileError/getProfileError";
import { getProfileForm } from "../../model/selectors/getProfileForm/getProfileForm";
import { getProfileIsLoading } from "../../model/selectors/getProfileIsLoading/getProfileIsLoading";
import { getProfileReadOnly } from "../../model/selectors/getProfileReadOnly/getProfileReadOnly";
import { getProfileValidationErrors } from "../../model/selectors/getProfileValidationErrors/getProfileValidationErrors";
import { profileReducer, useProfileActions } from "../../model/slices/profileSlice";
import { EditableProfileCardHeader } from "../EditableProfileCardHeader/EditableProfileCardHeader";

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

    const formData = useSelector(getProfileForm);
    const error = useSelector(getProfileError);
    const isLoading = useSelector(getProfileIsLoading);
    const readOnly = useSelector(getProfileReadOnly);
    const validationErrors = useSelector(getProfileValidationErrors);

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
                    <Text data-testid="EditableProfileCard.Error" key={error} text={t(error)} theme={TextTheme.Error} />
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
