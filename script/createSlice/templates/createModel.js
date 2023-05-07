const fs = require("fs");
const capitalizeString = require("../capitalizeString");
const resolveRoot = require("../resolveRoot");
const getSliceContent = require("./model/getSliceContent");
const getTypeContent = require("./model/getTypeContent");

const createModelFiles = (modelPathSegments, sliceName) => {
    const capitalizedSliceName = capitalizeString(sliceName);

    fs.writeFileSync(
        resolveRoot(...modelPathSegments, "types", `I${capitalizedSliceName}.ts`),
        getTypeContent(capitalizedSliceName)
    );

    fs.writeFileSync(resolveRoot(...modelPathSegments, "slices", `${sliceName}Slice.ts`), getSliceContent(sliceName));

    fs.writeFileSync(resolveRoot(...modelPathSegments, "selectors", `${sliceName}Selectors.ts`), "");
};

module.exports = (layer, sliceName) => {
    const capitalizedSliceName = capitalizeString(sliceName);
    const sliceSegments = ["src", layer, capitalizedSliceName];
    const modelPathSegments = [...sliceSegments, "model"];

    if (fs.existsSync(resolveRoot()) && !fs.existsSync(resolveRoot(...modelPathSegments))) {
        fs.mkdirSync(resolveRoot(...modelPathSegments));

        fs.mkdirSync(resolveRoot(...modelPathSegments, "types"));
        fs.mkdirSync(resolveRoot(...modelPathSegments, "services"));
        fs.mkdirSync(resolveRoot(...modelPathSegments, "slices"));
        fs.mkdirSync(resolveRoot(...modelPathSegments, "selectors"));

        createModelFiles(modelPathSegments, sliceName);
    }
};
