const fs = require("fs");
const capitalizeString = require("../capitalizeString");
const resolveRoot = require("../resolveRoot");
const createModel = require("./createModel");
const createPublicAPI = require("./createPublicAPI");
const createUi = require("./createUi");

module.exports = async (layer, sliceName) => {
    const capitalizedSliceName = capitalizeString(sliceName);
    try {
        fs.mkdirSync(resolveRoot("src", layer, capitalizedSliceName));
    } catch (error) {
        console.log(error.message);
    }

    createPublicAPI(layer, sliceName);
    createUi(layer, sliceName);
    createModel(layer, sliceName);
};
