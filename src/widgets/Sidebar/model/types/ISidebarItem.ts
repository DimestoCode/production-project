import { ComponentType, SVGProps } from "react";

export interface ISidebarItem {
    path: string;
    text: string;
    Icon: ComponentType<SVGProps<SVGSVGElement>>;
    isPrivate?: boolean;
}
