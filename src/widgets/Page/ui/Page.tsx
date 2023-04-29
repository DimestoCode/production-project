import { IStoreState } from "app/providers/StoreProvider";
import { getScrollByPath, scrollRestorationActions } from "features/ScrollRestoration";
import { MutableRefObject, ReactNode, UIEvent, useLayoutEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { classNames } from "shared/lib/classNames/classNames";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInfiniteScroll } from "shared/lib/hooks/useInfiniteScroll/useInfiniteScroll";
import { useThrottle } from "shared/lib/hooks/useThrottle/useThrottle";
import classes from "./Page.module.scss";

interface IPageProps {
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void;
}

export const Page = ({ className, children, onScrollEnd }: IPageProps) => {
    const wrapperRef = useRef() as MutableRefObject<HTMLInputElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLInputElement>;
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const scrollPosition = useSelector((state: IStoreState) => getScrollByPath(state, pathname));
    useInfiniteScroll({ triggerRef, wrapperRef, callback: onScrollEnd });

    const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
        dispatch(
            scrollRestorationActions.setScrollPosition({
                position: e.currentTarget.scrollTop,
                path: pathname
            })
        );
    }, 2000);

    useLayoutEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition;
    }, [scrollPosition]);

    return (
        <main className={classNames(classes.Page, {}, [className])} onScroll={onScroll} ref={wrapperRef}>
            {children}
            {onScrollEnd ? <div ref={triggerRef} /> : null}
        </main>
    );
};
