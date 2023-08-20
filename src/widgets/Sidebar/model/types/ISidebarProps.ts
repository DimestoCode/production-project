import { ReactElement } from "react";

export interface ISidebarProps {
    onToggle: () => void;
    collapsed: boolean;
    children: ReactElement | ReactElement[];
    className?: string;
}
