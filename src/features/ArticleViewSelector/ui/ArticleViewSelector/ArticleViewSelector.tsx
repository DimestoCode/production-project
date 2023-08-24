import { ComponentType, memo, SVGProps } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "@/shared/ui/deprecated/Button";
import { Icon } from "@/shared/ui/deprecated/Icon";
import { HStack } from "@/shared/ui/deprecated/Stack";
import { ArticleViewMode } from "@/entities/Article";

import GridIcon from "@/shared/assets/icons/grid.svg";
import ListIcon from "@/shared/assets/icons/list.svg";

import classes from "./ArticleViewSelector.module.scss";

interface IArticleViewModeProps {
    className?: string;
    view: ArticleViewMode;
    onViewClick: (view: ArticleViewMode) => void;
}

const viewModes: { view: ArticleViewMode; icon: ComponentType<SVGProps<SVGSVGElement>> }[] = [
    { view: "grid", icon: GridIcon },
    { view: "list", icon: ListIcon }
];

export const ArticleViewSelector = memo(({ className, onViewClick, view }: IArticleViewModeProps) => {
    const onClick = (viewMode: ArticleViewMode) => () => {
        onViewClick(viewMode);
    };
    return (
        <HStack align="center" className={className} gap="8">
            {viewModes.map((viewMode) => (
                <Button key={viewMode.view} onClick={onClick(viewMode.view)} theme={ButtonTheme.Clear}>
                    <Icon
                        Svg={viewMode.icon}
                        className={classNames(classes.icon, { [classes.active]: viewMode.view === view })}
                        height={20}
                        width={20}
                    />
                </Button>
            ))}
        </HStack>
    );
});
