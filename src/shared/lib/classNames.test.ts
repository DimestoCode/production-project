import { classNames } from "./classNames";

describe("classNames", () => {
    test("with first param only", () => {
        expect(classNames("someClass")).toBe("someClass");
    });

    test("with additional class", () => {
        const expected = "someClass someClass1 someClass2";

        expect(classNames("someClass", {}, ["someClass1", "someClass2"])).toBe(expected);
    });

    test("with truthy object classes", () => {
        const expected = "someClass someClass1 someClass2 hovered scrollable";
        expect(
            classNames(
                "someClass",
                {
                    hovered: true,
                    scrollable: true
                },
                ["someClass1", "someClass2"]
            )
        ).toBe(expected);
    });

    test("with falsy object classes", () => {
        const expected = "someClass someClass1 someClass2 hovered";
        expect(
            classNames(
                "someClass",
                {
                    hovered: true,
                    scrollable: false
                },
                ["someClass1", "someClass2"]
            )
        ).toBe(expected);
    });

    test("with falsy object classes including undefined", () => {
        const expected = "someClass someClass1 someClass2 hovered";
        expect(
            classNames(
                "someClass",
                {
                    hovered: true,
                    scrollable: undefined
                },
                ["someClass1", "someClass2"]
            )
        ).toBe(expected);
    });
});
