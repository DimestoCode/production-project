import { memo, ReactNode } from "react";
import { Popover as HPopover } from "@headlessui/react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { DropdownDirection } from "@/shared/types/ui";
import classes from "./Popover.module.scss";
import popup from "../../styles/popup.module.scss";

interface IPopoverProps {
    className?: string;
    triggerEl: ReactNode;
    direction?: DropdownDirection;
    children: ReactNode;
}

export const Popover = memo(({ className, triggerEl, direction = "bottom-right", children }: IPopoverProps) => {
    return (
        <HPopover className={classNames(classes.Popover, {}, [className, popup.popup])}>
            <HPopover.Button as="div" className={popup.trigger}>
                {triggerEl}
            </HPopover.Button>

            <HPopover.Panel className={classNames(classes.panel, {}, [popup[direction], popup.options])}>
                {children}
            </HPopover.Panel>
        </HPopover>
    );
});
