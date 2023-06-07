import { Project } from "ts-morph";

const project = new Project({});

project.addSourceFilesAtPaths(["src/**/*.ts", "src/**/*.tsx"]);

const files = project.getSourceFiles();

function isAbsolute(value: string) {
    const layers = ["app", "shared", "entities", "features", "widgets", "pages"];

    return layers.some((layer) => value.startsWith(layer));
}

files.forEach((file) => {
    const imports = file.getImportDeclarations();

    imports.forEach((importInstance) => {
        const moduleName = importInstance.getModuleSpecifierValue();

        if (isAbsolute(moduleName)) {
            importInstance.setModuleSpecifier(`@/${moduleName}`);
        }
    });
});

project.save();
