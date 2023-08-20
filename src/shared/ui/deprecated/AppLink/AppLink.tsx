import { FC, forwardRef, memo } from "react";
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

/**
 * Component is obsolete, new components are supposed to be used
 * @deprecated
 */
const AppLinkComponent: FC<IAppLinkProps> = forwardRef<HTMLAnchorElement, IAppLinkProps>(
    (props: IAppLinkProps, ref) => {
        const { to, className = "", children, theme = AppLinkTheme.Primary, ...rest } = props;
        return (
            <Link className={classNames(classes.AppLink, {}, [className, classes[theme]])} ref={ref} to={to} {...rest}>
                {children}
            </Link>
        );
    }
);

export const AppLink = memo(AppLinkComponent);
