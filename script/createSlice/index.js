const createTemplate = require("./templates/createTemplate");

const layers = ["features", "entities", "pages"];

const [, , layer, sliceName] = process.argv;

if (!layer) {
    throw new Error("Layer is not specified");
}

if (!layers.includes(layer)) {
    throw new Error(`Layer can be only: ${layers.join(", ")}`);
}

if (!sliceName) {
    throw new Error("Slice is not specified");
}

createTemplate(layer, sliceName);
