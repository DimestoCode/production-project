import { MutableRefObject, ReactNode, useRef } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { useInfiniteScroll } from "shared/lib/hooks/useInfiniteScroll/useInfiniteScroll";
import classes from "./Page.module.scss";

interface IPageProps {
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void;
}

export const Page = ({ className, children, onScrollEnd }: IPageProps) => {
    const wrapperRef = useRef() as MutableRefObject<HTMLInputElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLInputElement>;

    useInfiniteScroll({ triggerRef, wrapperRef, callback: onScrollEnd });
    return (
        <main className={classNames(classes.Page, {}, [className])} ref={wrapperRef}>
            {children}
            <div ref={triggerRef} />
        </main>
    );
};
