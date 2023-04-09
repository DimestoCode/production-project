import { useEffect } from "react";
import { useAppDispatch } from "../useAppDispatch/useAppDispatch";

export const useActionEffect = <T extends Function>(callback: T) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (__PROJECT__ !== "storybook") {
            dispatch(callback());
        }
    }, [callback, dispatch]);
};
