import {
    getProfileError,
    getProfileForm,
    getProfileIsLoading,
    getProfileReadOnly,
    profileActions,
    ProfileCard
} from "entities/Profile";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";

export const EditableProfileCard = () => {
    const dispatch = useAppDispatch();
    const formData = useSelector(getProfileForm);
    const error = useSelector(getProfileError);
    const isLoading = useSelector(getProfileIsLoading);
    const readOnly = useSelector(getProfileReadOnly);

    const onInputChange = useCallback(
        (value: string, name: string) => {
            dispatch(profileActions.updateProfile({ [name]: value ?? "" }));
        },
        [dispatch]
    );

    const onInputNumberChange = useCallback(
        (value: string, name: string) => {
            dispatch(profileActions.updateProfile({ [name]: Number(value) ?? 0 }));
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
        <ProfileCard
            data={formData}
            error={error}
            isLoading={isLoading}
            onInputChange={onInputChange}
            onInputNumberChange={onInputNumberChange}
            onSelectChange={onSelectChange}
            readOnly={readOnly}
        />
    );
};
