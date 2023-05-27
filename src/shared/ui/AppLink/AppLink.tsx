import { FC, memo } from "react";
import { Link, LinkProps } from "react-router-dom";
import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./AppLink.module.scss";

export enum AppLinkTheme {
    Primary = "primary",
    Secondary = "secondary"
}

interface IAppLinkProps extends LinkProps {
    className?: string;
    theme?: AppLinkTheme;
}

export const AppLink: FC<IAppLinkProps> = memo((props: IAppLinkProps) => {
    const { to, className = "", children, theme = AppLinkTheme.Primary, ...rest } = props;
    return (
        <Link className={classNames(classes.AppLink, {}, [className, classes[theme]])} to={to} {...rest}>
            {children}
        </Link>
    );
});
