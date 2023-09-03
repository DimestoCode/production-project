import { MutableRefObject, useEffect } from "react";

export interface IUseInfinitScrollProps {
    callback?: () => void;
    triggerRef: MutableRefObject<HTMLElement>;
    wrapperRef?: MutableRefObject<HTMLElement>;
}

export function useInfiniteScroll({ callback, triggerRef, wrapperRef }: IUseInfinitScrollProps) {
    useEffect(() => {
        let observer: IntersectionObserver | null = null;
        const triggerRefCopy = triggerRef.current;

        if (callback) {
            const options = {
                root: wrapperRef?.current,
                rootMargin: "0px",
                threshold: 1.0
            };
            observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    callback();
                }
            }, options);
            observer.observe(triggerRefCopy);
        }

        return () => {
            if (observer) {
                observer.unobserve(triggerRefCopy);
            }
        };
    }, [callback, triggerRef, wrapperRef]);
}
