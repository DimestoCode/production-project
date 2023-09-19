import { ComponentType, LazyExoticComponent, SVGProps, forwardRef } from "react";
import omit from "lodash/omit";
import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./Icon.module.scss";

type SvgProps = Omit<React.SVGProps<SVGSVGElement>, "onClick" | "ref">;

interface IIconBaseProps extends SvgProps {
    className?: string;
    Svg: ComponentType<SVGProps<SVGSVGElement>> | LazyExoticComponent<ComponentType<SVGProps<SVGSVGElement>>>;
    btnClassName?: string;
}

interface IClickableIcon extends IIconBaseProps {
    clickable: true;
    onClick: () => void;
}

interface INonClickableIcon extends IIconBaseProps {
    clickable?: false;
}

type IconProps = IClickableIcon | INonClickableIcon;

export const Icon = forwardRef<SVGSVGElement, IconProps>((props: IconProps, ref) => {
    const { className, Svg, width = 20, height = 20, clickable, ...rest } = props;

    const icon = (
        <Svg
            className={classNames(classes.Icon, {}, [className])}
            height={height}
            ref={ref}
            width={width}
            {...omit(rest, "onClick", "btnClassName")}
        />
    );

    if (clickable) {
        return (
            <button
                className={classNames(classes.button, {}, [rest.btnClassName])}
                onClick={props.onClick}
                style={{ width, height }}
                type="button"
            >
                {icon}
            </button>
        );
    }
    return icon;
});
