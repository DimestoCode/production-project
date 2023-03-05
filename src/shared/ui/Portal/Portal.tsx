import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface IPortalProps {
    children: ReactNode;
    element?: HTMLElement;
}

export const Portal = ({ children, element = document.querySelector("#app") }: IPortalProps) =>
    createPortal(children, element);
