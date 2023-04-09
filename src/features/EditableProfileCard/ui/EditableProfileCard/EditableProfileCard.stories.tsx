import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Country } from "entities/Country";
import { Currency } from "entities/Currency";
import { ProfileValidationError } from "entities/Profile/model/types/IProfile";
import { StoreDecorator } from "shared/config/storybook/StoreDecorator/StoreDecorator";
import { EditableProfileCard } from "./EditableProfileCard";

export default {
    title: "features/EditableProfileCard",
    component: EditableProfileCard,
    argTypes: {
        backgroundColor: { control: "color" }
    }
} as ComponentMeta<typeof EditableProfileCard>;

const Template: ComponentStory<typeof EditableProfileCard> = () => <EditableProfileCard />;

export const FilledDataReadonly = Template.bind({});
FilledDataReadonly.args = {};
FilledDataReadonly.decorators = [
    StoreDecorator({
        profile: {
            form: {
                age: 1,
                city: "City",
                country: Country.France,
                currency: Currency.EUR,
                firstName: "First",
                id: 1,
                lastName: "lAst",
                username: "User"
            },
            readonly: true,
            isLoading: false,
            validationErrors: []
        }
    })
];

export const FilledDataEditMode = Template.bind({});
FilledDataEditMode.args = {};
FilledDataEditMode.decorators = [
    StoreDecorator({
        user: {
            authData: {
                id: 1
            }
        },
        profile: {
            form: {
                age: 1,
                avatar: "avatar",
                city: "City",
                country: Country.France,
                currency: Currency.EUR,
                firstName: "First",
                id: 1,
                lastName: "lAst",
                username: "User"
            },
            readonly: false,
            isLoading: false,
            validationErrors: []
        }
    })
];

export const Loading = Template.bind({});
Loading.args = {};
Loading.decorators = [
    StoreDecorator({
        profile: {
            isLoading: true
        }
    })
];

export const Error = Template.bind({});
Error.args = {};
Error.decorators = [
    StoreDecorator({
        profile: {
            error: "Some error"
        }
    })
];

export const ValidationErrors = Template.bind({});
ValidationErrors.args = {};
ValidationErrors.decorators = [
    StoreDecorator({
        profile: {
            validationErrors: [
                ProfileValidationError.IncorrectAge,
                ProfileValidationError.IncorrectCountry,
                ProfileValidationError.IncorrectName,
                ProfileValidationError.ServerError,
                ProfileValidationError.NoData
            ]
        }
    })
];
