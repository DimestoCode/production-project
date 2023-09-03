import { memo, ReactNode, useCallback } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Card } from "../Card/Card";
import classes from "./Tabs.module.scss";
import { Flex, FlexAlign, FlexDirection } from "../Stack/Flex/Flex";

export interface ITabItem {
    value: string;
    content: ReactNode;
}
interface ITabsProps {
    className?: string;
    tabs: ITabItem[];
    value: string;
    onTabClick: (tab: ITabItem) => void;
    direction?: FlexDirection;
    align?: FlexAlign;
}

export const Tabs = memo(({ className, onTabClick, tabs, value, direction = "row", align = "center" }: ITabsProps) => {
    const handleClick = useCallback(
        (tab: ITabItem) => {
            return () => {
                onTabClick(tab);
            };
        },
        [onTabClick]
    );
    return (
        <Flex align={align} className={classNames(classes.Tabs, {}, [className])} direction={direction} gap="8">
            {tabs.map((tab) => (
                <Card
                    border="round"
                    className={classes.tabsCard}
                    key={tab.value}
                    onClick={handleClick(tab)}
                    variant={value === tab.value ? "light" : "normal"}
                >
                    {tab.content}
                </Card>
            ))}
        </Flex>
    );
});
