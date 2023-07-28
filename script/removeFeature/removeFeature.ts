import { CallExpression, Node, Project, SourceFile, SyntaxKind } from "ts-morph";

const removedFeatureName = process.argv[2]; // ex: isArticleEnabled
const featureState = process.argv[3]; // on/off

if (!removedFeatureName) {
    throw new Error("Feature name was not passed");
}

if (!featureState) {
    throw new Error("Feature state was not passed");
}

if (featureState !== "on" && featureState !== "off") {
    throw new Error("Value of feature state is wrong, allowed values are on/off");
}
const project = new Project({});

project.addSourceFilesAtPaths("src/**/*.ts");
project.addSourceFilesAtPaths("src/**/*.tsx");

const files: SourceFile[] = project.getSourceFiles();

function isToggleFunction(node: Node) {
    let isToggleFeatures = false;
    node.forEachChild((child) => {
        if (child.isKind(SyntaxKind.Identifier) && child.getText() === "toggleFeatures") {
            isToggleFeatures = true;
        }
    });

    return isToggleFeatures;
}

function getUseCallbackCallExpressionFirstArgumentBodyIfPossible(expression: CallExpression | undefined): string {
    if (!expression) {
        return "";
    }

    if (expression.getFirstDescendantByKind(SyntaxKind.Identifier)?.getText() !== "useCallback") {
        return "";
    }

    const [elementCallback] = expression?.getArguments() ?? [];
    return elementCallback.asKind(SyntaxKind.ArrowFunction)?.getBody().getText() ?? "";
}

files.forEach((sourceFile: SourceFile) => {
    sourceFile.forEachDescendant((node) => {
        if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
            const objectOptions = node.getFirstDescendantByKind(SyntaxKind.ObjectLiteralExpression);
            const onFunctionProperty = objectOptions?.getProperty("on");
            // console.log(onFunctionProperty?.getText());
            const offFunctionProperty = objectOptions?.getProperty("off");
            const featureNameProperty = objectOptions?.getProperty("name");
            const featureName = featureNameProperty
                ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
                ?.getText()
                .slice(1, -1);

            if (featureName !== removedFeatureName) {
                return;
            }

            // console.log(onFunctionProperty?.getChildren());
            const onFunctionUseCallbackExpression = onFunctionProperty?.getFirstDescendantByKind(
                SyntaxKind.CallExpression
            );

            const offFunctionUseCallbackExpression = offFunctionProperty?.getFirstDescendantByKind(
                SyntaxKind.CallExpression
            );

            if (featureState === "on") {
                node.replaceWithText(
                    getUseCallbackCallExpressionFirstArgumentBodyIfPossible(onFunctionUseCallbackExpression)
                );
            }

            if (featureState === "off") {
                node.replaceWithText(
                    getUseCallbackCallExpressionFirstArgumentBodyIfPossible(offFunctionUseCallbackExpression)
                );
            }
        }
    });
});

project.save();
