import { ComponentStory, ComponentMeta } from "@storybook/react";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { ArticleDetailsPageHeader } from "./ArticleDetailsPageHeader";

export default {
    title: "pages/Article/ArticleDetailsPageHeader",
    component: ArticleDetailsPageHeader,
    argTypes: {
        backgroundColor: { control: "color" }
    }
} as ComponentMeta<typeof ArticleDetailsPageHeader>;

const Template: ComponentStory<typeof ArticleDetailsPageHeader> = (args) => <ArticleDetailsPageHeader {...args} />;

export const EligibleToEdit = Template.bind({});
EligibleToEdit.args = {};
EligibleToEdit.decorators = [
    StoreDecorator({
        user: {
            authData: {
                id: 1,
                username: "Admin"
            }
        },
        articleDetails: {
            data: {
                user: {
                    id: 1,
                    username: "admin"
                }
            }
        }
    })
];

export const NotEligibleToEdit = Template.bind({});
NotEligibleToEdit.args = {};
NotEligibleToEdit.decorators = [
    StoreDecorator({
        user: {
            authData: {
                id: 1,
                username: "Admin"
            }
        },
        articleDetails: {
            data: {
                user: {
                    id: 2,
                    username: "admin"
                }
            }
        }
    })
];
