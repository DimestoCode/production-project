import { memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import LogoIcon from "@/shared/assets/icons/app-logo.svg";
import { HStack } from "../Stack";
import classes from "./AppLogo.module.scss";

interface IAppLogoProps {
    className?: string;
    size?: number;
}

export const AppLogo = memo(({ className, size }: IAppLogoProps) => {
    return (
        <HStack className={classNames(classes.appLogoWrapper, {}, [className])} justify="center" maxWidth>
            <div className={classes.gradientBig} />
            <div className={classes.gradientSmall} />
            <LogoIcon color="#000" height={size} width={size} />
        </HStack>
    );
});
