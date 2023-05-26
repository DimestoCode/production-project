import { Menu as HMenu } from "@headlessui/react";
import { uniqueId } from "lodash";
import { Fragment, ReactNode } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { DropdownDirection } from "shared/types/ui";
import { AppLink } from "../../../AppLink/AppLink";
import classes from "./Menu.module.scss";
import popup from "../../styles/popup.module.scss";

export interface IMenuItem {
    disabled?: boolean;
    label: ReactNode;
    onClick?: () => void;
    href?: string;
}

interface IMenuProps {
    className?: string;
    items: IMenuItem[];
    triggerEl: ReactNode;
    direction?: DropdownDirection;
}

export const Menu = ({ className, items, triggerEl, direction = "bottom-right" }: IMenuProps) => {
    return (
        <HMenu as="div" className={classNames(popup.popup, {}, [className, classes.menu])}>
            <HMenu.Button className={popup.trigger}>{triggerEl}</HMenu.Button>
            <HMenu.Items className={classNames(classes.options, {}, [popup[direction]])}>
                {items.map((item) => {
                    const getItemClassNames = (active: boolean) => classNames(classes.item, { [popup.active]: active });

                    if (item.href) {
                        return (
                            <HMenu.Item as={Fragment} disabled={item.disabled} key={uniqueId()}>
                                {({ active }) => (
                                    <AppLink className={getItemClassNames(active)} to={item.href!}>
                                        {item.label}
                                    </AppLink>
                                )}
                            </HMenu.Item>
                        );
                    }

                    return (
                        <HMenu.Item as={Fragment} disabled={item.disabled} key={uniqueId()}>
                            {({ active }) => (
                                <button className={getItemClassNames(active)} onClick={item.onClick} type="button">
                                    {item.label}
                                </button>
                            )}
                        </HMenu.Item>
                    );
                })}
            </HMenu.Items>
        </HMenu>
    );
};
