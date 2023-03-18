export type ClassNameObject = Record<string, string | boolean | undefined>;

export function classNames(
    stringClasses: string,
    objectClasses: ClassNameObject = {},
    additionalClasses: Array<string | undefined> = []
): string {
    return [
        stringClasses,
        ...additionalClasses.filter(Boolean),
        ...Object.keys(objectClasses).filter((key) => !!objectClasses[key])
    ].join(" ");
}
