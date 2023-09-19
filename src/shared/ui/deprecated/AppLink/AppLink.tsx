import { FC, forwardRef, memo } from "react";
import { Link, LinkProps } from "react-router-dom";
import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./AppLink.module.scss";

type AppLinkVariant = "primary" | "secondary";

interface IAppLinkProps extends LinkProps {
    className?: string;
    variant?: AppLinkVariant;
}

const AppLinkComponent: FC<IAppLinkProps> = forwardRef<HTMLAnchorElement, IAppLinkProps>(
    (props: IAppLinkProps, ref) => {
        const { to, className = "", children, variant = "primary", ...rest } = props;
        return (
            <Link
                className={classNames(classes.AppLink, {}, [className, classes[variant]])}
                ref={ref}
                to={to}
                {...rest}
            >
                {children}
            </Link>
        );
    }
);

/**
 * Component is obsolete, new components are supposed to be used
 * @deprecated
 */
export const AppLink = memo(AppLinkComponent);
