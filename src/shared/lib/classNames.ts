type ObjectClassType = Record<string, string | boolean>;

export function classNames(
    stringClasses: string,
    objectClasses: ObjectClassType = {},
    additionalClasses: string[] = []
): string {
    return [
        stringClasses,
        ...additionalClasses.filter(Boolean),
        ...Object.keys(objectClasses).filter((key) => !!objectClasses[key])
    ].join(" ");
}
