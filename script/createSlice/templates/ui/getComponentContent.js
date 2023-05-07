module.exports = (capitalizedSliceName) => {
    return `import { memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import classes from "./${capitalizedSliceName}.module.scss";

interface I${capitalizedSliceName}Props {
    className?: string;
}

export const ${capitalizedSliceName} = memo(({ className }: I${capitalizedSliceName}Props) => {
    return (
        <div className={classNames(classes.${capitalizedSliceName}, {}, [className])}>
            
        </div>
    );
});`;
};
