export interface IProfileCardProps {
    onCancel: () => void;
    onEdit: () => void;
    onSave: () => void;
    isEditable: boolean;
    readOnly: boolean;
    className?: string;
}
