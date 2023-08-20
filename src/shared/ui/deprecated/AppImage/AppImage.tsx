import { ImgHTMLAttributes, memo, ReactElement, useLayoutEffect, useState } from "react";

interface IAppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
    fallback?: ReactElement;
    errorFallback?: ReactElement;
}
/**
 * Component is obsolete, new components are supposed to be used
 * @deprecated
 */
export const AppImage = memo(({ className, src, alt = "", fallback, errorFallback, ...restProps }: IAppImageProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useLayoutEffect(() => {
        const img = new Image();
        img.src = src ?? "";
        img.onload = () => {
            setIsLoading(false);
        };

        img.onerror = () => {
            setIsLoading(false);
            setHasError(true);
        };
    }, [src]);

    if (isLoading && fallback) {
        return fallback;
    }

    if (hasError && errorFallback) {
        return errorFallback;
    }

    return <img alt={alt} className={className} src={src} {...restProps} />;
});
