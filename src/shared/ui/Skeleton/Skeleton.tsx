import { CSSProperties, useMemo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import classes from "./Skeleton.module.scss";

interface SkeletonProps {
    className?: string;
    height?: string | number;
    width?: string | number;
    borderRadius?: string;
}

export const Skeleton = ({ className, width, height, borderRadius }: SkeletonProps) => {
    const styles: CSSProperties = useMemo(
        () => ({
            width,
            height,
            borderRadius
        }),
        [width, height, borderRadius]
    );
    return <div className={classNames(classes.Skeleton, {}, [className])} style={styles} />;
};
