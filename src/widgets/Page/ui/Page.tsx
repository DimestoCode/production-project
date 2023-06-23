import { MutableRefObject, ReactNode, UIEvent, useLayoutEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { IStoreState } from "@/app/providers/StoreProvider";
import { getScrollByPath, useScrollRestorationActions } from "@/features/ScrollRestoration";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useInfiniteScroll } from "@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll";
import { useThrottle } from "@/shared/lib/hooks/useThrottle/useThrottle";
import classes from "./Page.module.scss";
import { ITestProps } from "@/shared/types/tests";

interface IPageProps extends ITestProps {
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void;
}

export const Page = ({ className, children, onScrollEnd, ...rest }: IPageProps) => {
    const wrapperRef = useRef() as MutableRefObject<HTMLInputElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLInputElement>;
    const { setScrollPosition } = useScrollRestorationActions();
    const { pathname } = useLocation();
    const scrollPosition = useSelector((state: IStoreState) => getScrollByPath(state, pathname));
    useInfiniteScroll({ triggerRef, wrapperRef, callback: onScrollEnd });

    const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
        setScrollPosition({
            position: e.currentTarget.scrollTop,
            path: pathname
        });
    }, 2000);

    useLayoutEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition;
    }, [scrollPosition]);

    return (
        <main
            className={classNames(classes.Page, {}, [className])}
            data-testid={rest["data-testid"] ?? "page"}
            onScroll={onScroll}
            ref={wrapperRef}
        >
            {children}
            {onScrollEnd ? <div ref={triggerRef} style={{ bottom: "1px", position: "relative" }} /> : null}
        </main>
    );
};
