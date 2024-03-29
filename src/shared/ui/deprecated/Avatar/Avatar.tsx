import { CSSProperties, useMemo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./Avatar.module.scss";
import { AppImage } from "../../redesigned/AppImage/AppImage";
import AvatarIcon from "../../../assets/icons/avatar-fallback.svg";
import { Icon } from "../Icon";
import { Skeleton } from "../Skeleton";

interface AvatarProps {
    className?: string;
    invertedFallback?: boolean;
    src?: string;
    alt?: string;
    size?: number;
}

/**
 * Component is obsolete, new components are supposed to be used
 * @deprecated
 */
export const Avatar = ({ className, src, alt, size = 100, invertedFallback }: AvatarProps) => {
    const styles: CSSProperties = useMemo(
        () => ({
            width: size,
            height: size
        }),
        [size]
    );

    const errorFallback = <Icon Svg={AvatarIcon} inverted={invertedFallback} width={size} />;
    const fallback = <Skeleton borderRadius="50%" height={size} width={size} />;
    return (
        <AppImage
            alt={alt}
            className={classNames(classes.Avatar, {}, [className])}
            errorFallback={errorFallback}
            fallback={fallback}
            src={src}
            style={styles}
        />
    );
};
