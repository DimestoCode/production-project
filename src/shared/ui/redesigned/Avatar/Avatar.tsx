import { CSSProperties, useMemo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./Avatar.module.scss";
import { AppImage } from "../../redesigned/AppImage/AppImage";
import AvatarIcon from "../../../assets/icons/avatar-fallback.svg";
import { Icon } from "../Icon";
import { Skeleton } from "../Skeleton";

interface AvatarProps {
    className?: string;
    src?: string;
    alt?: string;
    size?: number;
}

export const Avatar = ({ className, src, alt, size = 100 }: AvatarProps) => {
    const styles: CSSProperties = useMemo(
        () => ({
            width: size,
            height: size
        }),
        [size]
    );

    const errorFallback = <Icon Svg={AvatarIcon} width={size} />;
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
