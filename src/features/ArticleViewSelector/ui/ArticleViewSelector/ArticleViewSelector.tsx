import { ComponentType, lazy, LazyExoticComponent, memo, SVGProps } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Button as ButtonDeprecated, ButtonTheme } from "@/shared/ui/deprecated/Button";
import { Icon as IconDeprecated } from "@/shared/ui/deprecated/Icon";
import { HStack } from "@/shared/ui/redesigned/Stack";
import { ArticleViewMode } from "@/entities/Article";
import classes from "./ArticleViewSelector.module.scss";
import { ToggleFeatures, toggleFeatures } from "@/shared/lib/features";
import { Card } from "@/shared/ui/redesigned/Card";
import { Icon } from "@/shared/ui/redesigned/Icon";

const GridIconDeprecated = lazy(() => import("@/shared/assets/icons/grid.svg"));
const ListIconDeprecated = lazy(() => import("@/shared/assets/icons/list.svg"));
const GridIcon = lazy(() => import("@/shared/assets/icons/grid-redesigned.svg"));
const ListIcon = lazy(() => import("@/shared/assets/icons/list-redesigned.svg"));

interface IArticleViewModeProps {
    className?: string;
    view: ArticleViewMode;
    onViewClick: (view: ArticleViewMode) => void;
}

const viewModes: { view: ArticleViewMode; icon: LazyExoticComponent<ComponentType<SVGProps<SVGSVGElement>>> }[] = [
    {
        view: "grid",
        icon: toggleFeatures({ name: "isAppRedesigned", on: () => GridIcon, off: () => GridIconDeprecated })
    },
    {
        view: "list",
        icon: toggleFeatures({ name: "isAppRedesigned", on: () => ListIcon, off: () => ListIconDeprecated })
    }
];

export const ArticleViewSelector = memo(({ className, onViewClick, view }: IArticleViewModeProps) => {
    const onClick = (viewMode: ArticleViewMode) => () => {
        onViewClick(viewMode);
    };
    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <HStack align="center" className={classNames(classes.ArticleViewSelector, {}, [className])} gap="8">
                    {viewModes.map((viewMode) => (
                        <ButtonDeprecated
                            key={viewMode.view}
                            onClick={onClick(viewMode.view)}
                            theme={ButtonTheme.Clear}
                        >
                            <IconDeprecated
                                Svg={viewMode.icon}
                                className={classNames(classes.icon, { [classes.active]: viewMode.view === view })}
                                height={20}
                                width={20}
                            />
                        </ButtonDeprecated>
                    ))}
                </HStack>
            }
            on={
                <Card border="round" className={classNames(classes.ArticleViewSelectorRedesigned, {}, [className])}>
                    <HStack gap="8">
                        {viewModes.map((viewMode) => (
                            <figure className={classes.iconWrapper} key={viewMode.view}>
                                <Icon
                                    Svg={viewMode.icon}
                                    className={classNames(classes.icon, { [classes.active]: viewMode.view === view })}
                                    height={20}
                                    onClick={onClick(viewMode.view)}
                                    width={20}
                                    clickable
                                />
                            </figure>
                        ))}
                    </HStack>
                </Card>
            }
        />
    );
});
