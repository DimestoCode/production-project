type ObjectClassType = Record<string, string | boolean>;

export function classNames(
    stringClasses: string,
    objectClasses: ObjectClassType = {},
    additionalClasses: string[] = []
): string {
    return [
        stringClasses,
        ...Object.keys(objectClasses).filter((key) => !!objectClasses[key]),
        ...additionalClasses.filter(Boolean)
    ].join(" ");
}
