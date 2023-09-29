import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useProfileActions } from "../../model/slices/profileSlice";
import { getIsProfileFormEditable } from "../../model/selectors/getIsProfileFormEditable/getIsProfileFormEditable";
import { useProfileReadOnly } from "../../model/selectors/getProfileReadOnly/getProfileReadOnly";
import { updateProfileData } from "../../model/services/updateProfileData/updateProfileData";
import { IProfileCardProps } from "../../model/types/IProfileCardProps";
import { ToggleFeatures } from "@/shared/lib/features";
import { EditableProfileCardHeaderDeprecated } from "./deprecated/EditableProfileCardHeaderDeprecated";
import { EditableProfileCardHeaderRedesigned } from "./redesigned/EditableProfileCardHeaderRedesigned";

interface EditableProfileCardHeaderProps {
    className?: string;
}

export const EditableProfileCardHeader = ({ className }: EditableProfileCardHeaderProps) => {
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

    const props = useMemo<IProfileCardProps>(() => {
        return {
            onEdit,
            onCancel,
            isEditable,
            onSave,
            readOnly,
            className
        };
    }, [className, isEditable, onCancel, onEdit, onSave, readOnly]);
    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={<EditableProfileCardHeaderDeprecated {...props} />}
            on={<EditableProfileCardHeaderRedesigned {...props} />}
        />
    );
};
