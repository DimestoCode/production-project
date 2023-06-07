import { Project } from "ts-morph";
import path from "path";

const project = new Project({});

project.addSourceFilesAtPaths(["src/**/*.ts", "src/**/*.tsx"]);

const files = project.getSourceFiles();

function isAbsolute(value: string) {
    const layers = ["app", "shared", "entities", "features", "widgets", "pages"];

    return layers.some((layer) => value.startsWith(layer));
}
const uiPath = path.resolve(__dirname, "..", "..", "src", "shared", "ui");
const sharedUiDirectory = project.getDirectory(uiPath);
const componentsDirs = sharedUiDirectory?.getDirectories();

componentsDirs?.forEach((directory) => {
    const indexFilePath = `${directory.getPath()}/index.ts`;
    const indexFile = directory.getSourceFile(indexFilePath);

    if (!indexFile) {
        const sourceCode = `export * from "./${directory.getBaseName()}";
`;
        const file = directory.createSourceFile(indexFilePath, sourceCode, { overwrite: true });

        file.save();
    }
});

files.forEach((file) => {
    const imports = file.getImportDeclarations();

    imports.forEach((importInstance) => {
        const moduleName = importInstance.getModuleSpecifierValue();
        const moduleNameWithoutAlias = moduleName.replace("@/", "");
        const moduleSegments = moduleNameWithoutAlias.split("/");

        const isSharedLayer = moduleSegments?.[0] === "shared";
        const isUiSlice = moduleSegments?.[1] === "ui";

        if (isAbsolute(moduleNameWithoutAlias) && isSharedLayer && isUiSlice) {
            const result = [...moduleSegments].slice(0, 3).join("/");
            importInstance.setModuleSpecifier(`@/${result}`);
        }
    });
});

project.save();
