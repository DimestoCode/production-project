import React, { ComponentType, FC } from "react";
import { AnimationProvider } from "./AnimationProvider";

const withAnimationProvider = <T,>(Component: ComponentType<T>): FC<T> => {
    return (props: T) => {
        return (
            <AnimationProvider>
                <Component {...props} />
            </AnimationProvider>
        );
    };
};

export default withAnimationProvider;
