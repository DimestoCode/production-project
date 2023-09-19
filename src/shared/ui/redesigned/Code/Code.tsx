import { memo, useCallback } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import CopyIcon from "@/shared/assets/icons/copy-redesigned.svg";
import { Icon } from "../Icon";
import classes from "./Code.module.scss";

interface CodeProps {
    className?: string;
    text: string;
}

export const Code = memo(({ className, text }: CodeProps) => {
    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text);
    }, [text]);

    return (
        <pre className={classNames(classes.Code, {}, [className])}>
            <Icon Svg={CopyIcon} btnClassName={classes.copytBtn} onClick={onCopy} clickable />
            <code>{text}</code>
        </pre>
    );
});
