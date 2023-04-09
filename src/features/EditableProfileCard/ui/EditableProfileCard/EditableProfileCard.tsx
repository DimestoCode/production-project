import {
    getProfileError,
    getProfileForm,
    getProfileIsLoading,
    getProfileReadOnly,
    getProfileValidationErrors,
    profileActions,
    ProfileCard
} from "entities/Profile";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Text, TextTheme } from "shared/ui/Text/Text";

export const EditableProfileCard = memo(() => {
    const { t } = useTranslation("profile");
    const dispatch = useAppDispatch();
    const formData = useSelector(getProfileForm);
    const error = useSelector(getProfileError);
    const isLoading = useSelector(getProfileIsLoading);
    const readOnly = useSelector(getProfileReadOnly);
    const validationErrors = useSelector(getProfileValidationErrors);

    const onInputChange = useCallback(
        (value: string, name: string) => {
            dispatch(profileActions.updateProfile({ [name]: value ?? "" }));
        },
        [dispatch]
    );

    const onInputNumberChange = useCallback(
        (value: string, name: string) => {
            dispatch(profileActions.updateProfile({ [name]: value ? +value : "" }));
        },
        [dispatch]
    );

    const onSelectChange = useCallback(
        <T extends string>(value: T, name: string) => {
            dispatch(profileActions.updateProfile({ [name]: value }));
        },
        [dispatch]
    );

    return (
        <>
            {!!validationErrors?.length &&
                validationErrors.map((error) => <Text key={error} text={t(error)} theme={TextTheme.Error} />)}
            <ProfileCard
                data={formData}
                error={error}
                isLoading={isLoading}
                onInputChange={onInputChange}
                onInputNumberChange={onInputNumberChange}
                onSelectChange={onSelectChange}
                readOnly={readOnly}
            />
        </>
    );
});
