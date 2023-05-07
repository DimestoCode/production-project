module.exports = (layer, capitalizedSliceName) => {
    return `import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ${capitalizedSliceName} } from "./${capitalizedSliceName}";

export default {
    title: "${layer}/${capitalizedSliceName}",
    component: ${capitalizedSliceName},
    argTypes: {
        backgroundColor: { control: "color" }
    }
} as ComponentMeta<typeof ${capitalizedSliceName}>;

const Template: ComponentStory<typeof ${capitalizedSliceName}> = (args) => <${capitalizedSliceName} {...args} />;`;
};
