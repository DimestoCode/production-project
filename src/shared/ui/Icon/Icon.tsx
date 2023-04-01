import { SVGProps, VFC } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import classes from "./Icon.module.scss";

interface IconProps {
    className?: string;
    Svg: VFC<SVGProps<SVGSVGElement>>;
}

export const Icon = ({ className, Svg }: IconProps) => {
    return <Svg className={classNames(classes.Icon, {}, [className])} />;
};
