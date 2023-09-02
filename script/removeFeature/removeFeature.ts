import { ArrowFunction, CallExpression, JsxAttribute, Node, Project, SourceFile, SyntaxKind } from "ts-morph";

const toggleFunctionName = "toggleFeatures";
const toggleComponentName = "ToggleFeatures";

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
        if (child.isKind(SyntaxKind.Identifier) && child.getText() === toggleFunctionName) {
            isToggleFeatures = true;
        }
    });

    return isToggleFeatures;
}

function isToggleComponent(node: Node) {
    const identifier = node.getFirstDescendantByKind(SyntaxKind.Identifier);

    return identifier?.getText() === toggleComponentName;
}

function getCallExpressionBody(expression: CallExpression | undefined): string {
    console.log("EXP", expression);

    if (!expression) {
        return "";
    }

    if (expression.getFirstDescendantByKind(SyntaxKind.Identifier)?.getText() !== "useCallback") {
        return expression.getText();
    }

    const [elementCallback] = expression?.getArguments() ?? [];
    return elementCallback.asKind(SyntaxKind.ArrowFunction)?.getBody().getText() ?? "";
}

function getArrowFunctionBody(arrowFunction: ArrowFunction) {
    return arrowFunction.getBody().getText();
}

const replaceToggleFunction = (node: Node) => {
    const objectOptions = node.getFirstDescendantByKind(SyntaxKind.ObjectLiteralExpression);
    const onFunctionProperty = objectOptions?.getProperty("on");
    const offFunctionProperty = objectOptions?.getProperty("off");
    const featureNameProperty = objectOptions?.getProperty("name");

    const featureName = featureNameProperty?.getFirstDescendantByKind(SyntaxKind.StringLiteral)?.getText().slice(1, -1);

    if (featureName !== removedFeatureName) {
        return;
    }

    // console.log(onFunctionProperty?.getChildren());

    const onFunctionPropertyBody =
        onFunctionProperty?.getFirstDescendantByKind(SyntaxKind.CallExpression) ??
        onFunctionProperty?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);

    const offFunctionPropertyBody =
        offFunctionProperty?.getFirstDescendantByKind(SyntaxKind.CallExpression) ??
        offFunctionProperty?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);

    if (featureState === "on" && onFunctionPropertyBody) {
        if (Node.isCallExpression(onFunctionPropertyBody))
            node.replaceWithText(getCallExpressionBody(onFunctionPropertyBody));
        else node.replaceWithText(getArrowFunctionBody(onFunctionPropertyBody));
    }

    if (featureState === "off" && offFunctionPropertyBody) {
        if (Node.isCallExpression(offFunctionPropertyBody))
            node.replaceWithText(getCallExpressionBody(offFunctionPropertyBody));
        else node.replaceWithText(getArrowFunctionBody(offFunctionPropertyBody));
    }
};

const getAttributeNodeByName = (jsxAttributes: JsxAttribute[], name: string) =>
    jsxAttributes.find((node) => node.getName() === name);

const getReplacedComponent = (attribute: JsxAttribute | undefined) => {
    const value = attribute?.getFirstDescendantByKind(SyntaxKind.JsxExpression)?.getExpression()?.getText();
    if (value?.startsWith("(")) {
        return value.slice(1, -1);
    }

    return value;
};

const replaceToggleComponent = (node: Node) => {
    const attributes = node.getDescendantsOfKind(SyntaxKind.JsxAttribute);
    const onAttribute = getAttributeNodeByName(attributes, "on");
    const offAttribute = getAttributeNodeByName(attributes, "off");

    const featureNameAttribute = getAttributeNodeByName(attributes, "feature");
    const featureName = featureNameAttribute
        ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
        ?.getText()
        ?.slice(1, -1);

    if (featureName !== removedFeatureName) return;

    const offValue = getReplacedComponent(offAttribute);
    const onValue = getReplacedComponent(onAttribute);

    if (featureState === "on" && onValue) {
        node.replaceWithText(onValue);
    }

    if (featureState === "off" && offValue) {
        node.replaceWithText(offValue);
    }
};

files.forEach((sourceFile: SourceFile) => {
    sourceFile.forEachDescendant((node) => {
        if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
            replaceToggleFunction(node);
            return;
        }

        if (node.isKind(SyntaxKind.JsxSelfClosingElement) && isToggleComponent(node)) {
            replaceToggleComponent(node);
        }
    });
});

project.save();
