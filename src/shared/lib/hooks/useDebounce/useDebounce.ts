import { MutableRefObject, useCallback, useRef } from "react";

export function useDebounce(callback: (...args: any[]) => void, delay: number) {
    const timer: MutableRefObject<NodeJS.Timer | undefined> = useRef();

    return useCallback(
        (...args: any[]) => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
            timer.current = setTimeout(() => {
                callback(...args);
            }, delay);
        },
        [callback, delay]
    );
}
