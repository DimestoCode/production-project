import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from "react";

const ForceUpdateContext = createContext({
    value: true,
    forceUpdate: () => {}
});

export const useForceUpdate = () => {
    const { forceUpdate } = useContext(ForceUpdateContext);

    return forceUpdate;
};

export function ForceUpdateProvider({ children }: { children: ReactNode }) {
    const [value, setValue] = useState(true);

    const forceUpdate = useCallback(() => {
        setValue((prev) => !prev);
        setTimeout(() => {
            setValue((prev) => !prev);
        });
    }, []);

    const values = useMemo(
        () => ({
            value,
            forceUpdate
        }),
        [forceUpdate, value]
    );

    if (!value) {
        return null;
    }

    return <ForceUpdateContext.Provider value={values}>{children}</ForceUpdateContext.Provider>;
}
