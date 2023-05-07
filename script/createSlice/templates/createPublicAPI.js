const fs = require("fs");
const capitalizeString = require("../capitalizeString");
const resolveRoot = require("../resolveRoot");

const getPublicApiContent = (sliceName) => {
    const capitalizedSliceName = capitalizeString(sliceName);

    return `export { type I${capitalizedSliceName}State } from "./model/types/I${capitalizedSliceName}";
export { ${capitalizedSliceName} } from "./ui/${capitalizedSliceName}/${capitalizedSliceName};"
export { ${sliceName}Reducer } from "./model/slices/${sliceName}Slice";`;
};

module.exports = (layer, sliceName) => {
    const pathSegments = ["src", layer, sliceName];

    if (fs.existsSync(resolveRoot(...pathSegments))) {
        fs.writeFileSync(resolveRoot(...pathSegments, "index.ts"), getPublicApiContent(sliceName));
    }
};
