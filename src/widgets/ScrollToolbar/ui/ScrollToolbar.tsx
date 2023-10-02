import { memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./ScrollToolbar.module.scss";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { ScrollToTopButton } from "@/features/ScrollToTopButton";

interface IScrollToolbarProps {
    className?: string;
}

export const ScrollToolbar = memo(({ className }: IScrollToolbarProps) => {
    return (
        <VStack align="center" className={classNames(classes.ScrollToolbar, {}, [className])} justify="center">
            <ScrollToTopButton />
        </VStack>
    );
});
