import { memo, SVGProps, VFC } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import ListIcon from "shared/assets/icons/list.svg";
import GridIcon from "shared/assets/icons/grid.svg";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Icon } from "shared/ui/Icon/Icon";
import { ArticleViewMode } from "../../model/types/IArticle";
import classes from "./ArticleViewSelector.module.scss";

interface IArticleViewModeProps {
    className?: string;
    view: ArticleViewMode;
    onViewClick: (view: ArticleViewMode) => void;
}

const viewModes: { view: ArticleViewMode; icon: VFC<SVGProps<SVGSVGElement>> }[] = [
    { view: "grid", icon: GridIcon },
    { view: "list", icon: ListIcon }
];

export const ArticleViewSelector = memo(({ className, onViewClick, view }: IArticleViewModeProps) => {
    const onClick = (viewMode: ArticleViewMode) => () => {
        onViewClick(viewMode);
    };

    return (
        <div className={classNames(classes.ArticleViewSelector, {}, [className])}>
            {viewModes.map((viewMode) => {
                return (
                    <Button key={viewMode.view} onClick={onClick(viewMode.view)} theme={ButtonTheme.Clear}>
                        <Icon
                            Svg={viewMode.icon}
                            className={classNames(classes.icon, { [classes.notActive]: viewMode.view !== view })}
                        />
                    </Button>
                );
            })}
        </div>
    );
});
