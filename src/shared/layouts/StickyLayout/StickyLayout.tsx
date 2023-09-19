import { ReactElement, memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./StickyLayout.module.scss";

interface IStickyLayoutProps {
    className?: string;
    left?: ReactElement;
    content: ReactElement;
    right?: ReactElement;
}

export const StickyLayout = memo(({ className, content, left, right }: IStickyLayoutProps) => {
    return (
        <div className={classNames(classes.StickyLayout, {}, [className])}>
            {left && <div className={classes.left}>{left}</div>}
            <div className={classes.content}>{content}</div>
            {right && <div className={classes.right}>{right}</div>}
        </div>
    );
});
