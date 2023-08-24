import { FC, forwardRef, memo } from "react";
import { LinkProps, NavLink } from "react-router-dom";
import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./AppLink.module.scss";

type AppLinkTheme = "primary" | "secondary";

interface IAppLinkProps extends LinkProps {
    className?: string;
    variant?: AppLinkTheme;
    activeClassName?: string;
}

const AppLinkComponent: FC<IAppLinkProps> = forwardRef<HTMLAnchorElement, IAppLinkProps>(
    (props: IAppLinkProps, ref) => {
        const { activeClassName = "", to, className = "", children, variant = "primary", ...rest } = props;
        return (
            <NavLink
                className={({ isActive }) =>
                    classNames(classes.AppLink, { [activeClassName]: isActive }, [className, classes[variant]])
                }
                ref={ref}
                to={to}
                {...rest}
            >
                {children}
            </NavLink>
        );
    }
);

export const AppLink = memo(AppLinkComponent);
