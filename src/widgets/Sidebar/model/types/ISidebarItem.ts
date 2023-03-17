import { VFC, SVGProps } from "react";

export interface ISidebarItem {
    path: string;
    text: string;
    Icon: VFC<SVGProps<SVGSVGElement>>;
}
