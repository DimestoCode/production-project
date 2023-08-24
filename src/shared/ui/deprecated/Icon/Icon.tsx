import { ComponentType, LazyExoticComponent, SVGProps } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./Icon.module.scss";

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, "ref"> {
    className?: string;
    Svg: ComponentType<SVGProps<SVGSVGElement>> | LazyExoticComponent<ComponentType<SVGProps<SVGSVGElement>>>;
    inverted?: boolean;
}
/**
 * Component is obsolete, new components are supposed to be used
 * @deprecated
 */
export const Icon = ({ className, Svg, inverted = false, ...rest }: IconProps) => {
    return (
        <Svg
            className={classNames(
                classes.Icon,
                {
                    [classes.inverted]: inverted
                },
                [className]
            )}
            {...rest}
        />
    );
};
