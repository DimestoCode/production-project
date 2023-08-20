import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface IPortalProps {
    children: ReactNode;
    element?: HTMLElement;
}

/**
 * Component is obsolete, new components are supposed to be used
 * @deprecated
 */
export const Portal = ({ children, element = document.body }: IPortalProps) => createPortal(children, element);
