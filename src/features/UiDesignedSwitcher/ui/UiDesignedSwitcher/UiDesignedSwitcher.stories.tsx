import { ComponentMeta } from "@storybook/react";
import { UiDesignedSwitcher } from "./UiDesignedSwitcher";

export default {
    title: "features/UiDesignedSwitcher",
    component: UiDesignedSwitcher,
    argTypes: {
        backgroundColor: { control: "color" }
    }
} as ComponentMeta<typeof UiDesignedSwitcher>;

// const Template: ComponentStory<typeof UiDesignedSwitcher> = (args) => <UiDesignedSwitcher {...args} />;
