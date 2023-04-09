import { useCallback, useMemo, useState } from "react";

interface IHoverHandlers {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

type UserHoverPayload = [boolean, IHoverHandlers];

export const useHover = (): UserHoverPayload => {
    const [isHover, setIsHover] = useState(false);
    const onMouseEnter = useCallback(() => {
        setIsHover(true);
    }, []);

    const onMouseLeave = useCallback(() => {
        setIsHover(false);
    }, []);

    return useMemo(
        () => [
            isHover,
            {
                onMouseEnter,
                onMouseLeave
            }
        ],
        [isHover, onMouseEnter, onMouseLeave]
    );
};
