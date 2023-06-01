import { SVGProps, VFC } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./Icon.module.scss";

interface IconProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
    Svg: VFC<SVGProps<SVGSVGElement>>;
    inverted?: boolean;
}

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
