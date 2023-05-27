import { createContext, ReactNode, useContext, useEffect, useMemo, useRef, useState } from "react";

type SpringType = typeof import("@react-spring/web");
type GestureType = typeof import("@use-gesture/react");

interface IAnimationContext {
    Gesture?: GestureType;
    Spring?: SpringType;
    isLoaded?: boolean;
}

const AnimationContext = createContext<IAnimationContext>({});

const getAsyncAnimationModules = async () => {
    return Promise.all([import("@react-spring/web"), import("@use-gesture/react")]);
};

export const useAnimationLibraries = () => useContext(AnimationContext) as Required<IAnimationContext>;

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
    const SpringRef = useRef<SpringType>();
    const GestureRef = useRef<GestureType>();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        getAsyncAnimationModules().then(([Spring, Gesture]) => {
            SpringRef.current = Spring;
            GestureRef.current = Gesture;
            setIsLoaded(true);
        });
    });

    const value = useMemo(
        () => ({
            Spring: SpringRef.current,
            Gesture: GestureRef.current,
            isLoaded
        }),
        [isLoaded]
    );

    return <AnimationContext.Provider value={value}>{children}</AnimationContext.Provider>;
};
