import { useEffect } from "react";
import { useAppDispatch } from "../useAppDispatch/useAppDispatch";

export const useActionEffect = <T extends Function>(callback: T, trigger = true) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (trigger) {
            dispatch(callback());
        }
    }, [callback, dispatch, trigger]);
};
