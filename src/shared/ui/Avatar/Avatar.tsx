import { CSSProperties, useMemo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./Avatar.module.scss";

interface AvatarProps {
    className?: string;
    src?: string;
    alt?: string;
    size?: number;
}

export const Avatar = ({ className, src, alt, size }: AvatarProps) => {
    const styles: CSSProperties = useMemo(
        () => ({
            width: size ?? 100,
            height: size ?? 100
        }),
        [size]
    );
    return <img alt={alt} className={classNames(classes.Avatar, {}, [className])} src={src} style={styles} />;
};
