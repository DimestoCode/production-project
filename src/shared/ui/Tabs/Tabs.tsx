import { memo, ReactNode, useCallback } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Card, CardTheme } from "../Card/Card";
import classes from "./Tabs.module.scss";

export interface ITabItem {
    value: string;
    content: ReactNode;
}
interface ITabsProps {
    className?: string;
    tabs: ITabItem[];
    value: string;
    onTabClick: (tab: ITabItem) => void;
}

export const Tabs = memo(({ className, onTabClick, tabs, value }: ITabsProps) => {
    const handleClick = useCallback(
        (tab: ITabItem) => {
            return () => {
                onTabClick(tab);
            };
        },
        [onTabClick]
    );
    return (
        <div className={classNames(classes.Tabs, {}, [className])}>
            {tabs.map((tab) => (
                <Card
                    key={tab.value}
                    onClick={handleClick(tab)}
                    theme={value === tab.value ? CardTheme.Normal : CardTheme.Outlined}
                >
                    {tab.content}
                </Card>
            ))}
        </div>
    );
});
