import { ComponentStory, ComponentMeta } from "@storybook/react";
import { StoreDecorator } from "shared/config/storybook/StoreDecorator/StoreDecorator";
import ForbiddenPage from "./ForbiddenPage";

export default {
    title: "pages/ForbiddenPage",
    component: ForbiddenPage,
    argTypes: {
        backgroundColor: { control: "color" }
    },
    decorators: [StoreDecorator({})]
} as ComponentMeta<typeof ForbiddenPage>;

const Template: ComponentStory<typeof ForbiddenPage> = () => <ForbiddenPage />;

export const Normal = Template.bind({});
