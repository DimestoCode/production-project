import { memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./ScrollToTopButton.module.scss";
import { Icon } from "@/shared/ui/redesigned/Icon";
import ScrollToTopIcon from "@/shared/assets/icons/scroll-to-top.svg";

interface IScrollToTopButtonProps {
    className?: string;
}

export const ScrollToTopButton = memo(({ className }: IScrollToTopButtonProps) => {
    const onClick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <Icon
            Svg={ScrollToTopIcon}
            className={classNames(classes.ScrollToTopButton, {}, [className])}
            height={32}
            onClick={onClick}
            width={32}
            clickable
        />
    );
});
