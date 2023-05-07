const fs = require("fs");
const capitalizeString = require("../capitalizeString");
const resolveRoot = require("../resolveRoot");
const getComponentContent = require("./ui/getComponentContent");
const getStoryContent = require("./ui/getStoryContent");
const getStylesContent = require("./ui/getStylesContent");

const createUIFiles = async (uiComponentPathSegments, capitalizedSliceName, layer) => {
    fs.writeFileSync(
        resolveRoot(...uiComponentPathSegments, `${capitalizedSliceName}.tsx`),
        getComponentContent(capitalizedSliceName)
    );

    fs.writeFileSync(
        resolveRoot(...uiComponentPathSegments, `${capitalizedSliceName}.stories.tsx`),
        getStoryContent(layer, capitalizedSliceName)
    );

    fs.writeFileSync(
        resolveRoot(...uiComponentPathSegments, `${capitalizedSliceName}.module.scss`),
        getStylesContent(capitalizedSliceName)
    );
};

module.exports = (layer, sliceName) => {
    const capitalizedSliceName = capitalizeString(sliceName);
    const basePathSegments = ["src", layer, capitalizedSliceName];
    const uiPathSegments = [...basePathSegments, "ui"];

    const resolvedUiPath = resolveRoot(...uiPathSegments);
    if (fs.existsSync(resolveRoot(...basePathSegments)) && !fs.existsSync(resolvedUiPath)) {
        fs.mkdirSync(resolvedUiPath);
        const uiComponentPathSegments = [...uiPathSegments, capitalizedSliceName];
        fs.mkdirSync(resolveRoot(...uiComponentPathSegments));

        createUIFiles(uiComponentPathSegments, capitalizedSliceName, layer);
    }
};
