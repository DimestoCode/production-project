import { ComponentStory, ComponentMeta } from "@storybook/react";
import { rest } from "msw";
import { Country } from "@/entities/Country";
import { Currency } from "@/entities/Currency";
import { IProfile } from "@/entities/Profile";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { ProfileValidationError } from "../../model/consts/ProfileValidationError";
import { EditableProfileCard } from "./EditableProfileCard";

const profile: IProfile = {
    age: 1,
    city: "City",
    country: Country.France,
    currency: Currency.EUR,
    firstName: "First",
    id: 1,
    lastName: "lAst",
    username: "User"
};

export default {
    title: "features/EditableProfileCard",
    component: EditableProfileCard,
    argTypes: {
        backgroundColor: { control: "color" }
    },
    parameters: {
        msw: {
            handlers: [
                rest.get("/profile/1", (req, res, ctx) => {
                    return res(ctx.json(profile));
                })
            ]
        }
    }
} as ComponentMeta<typeof EditableProfileCard>;

const Template: ComponentStory<typeof EditableProfileCard> = (args) => <EditableProfileCard {...args} />;

export const FilledDataReadonly = Template.bind({});
FilledDataReadonly.args = {
    profileId: 1
};
FilledDataReadonly.decorators = [
    StoreDecorator({
        profile: {
            form: profile,
            readonly: true,
            isLoading: false,
            validationErrors: []
        }
    })
];

export const FilledDataEditMode = Template.bind({});
FilledDataEditMode.args = {
    profileId: 1
};
FilledDataEditMode.decorators = [
    StoreDecorator({
        user: {
            authData: {
                id: 1
            }
        },
        profile: {
            form: profile,
            readonly: false,
            isLoading: false,
            validationErrors: []
        }
    })
];

export const Loading = Template.bind({});
Loading.args = {
    profileId: 1
};
Loading.decorators = [
    StoreDecorator({
        profile: {
            isLoading: true
        }
    })
];

export const Error = Template.bind({});
Error.args = {
    profileId: 1
};
Error.decorators = [
    StoreDecorator({
        profile: {
            error: "Some error"
        }
    })
];

export const ValidationErrors = Template.bind({});
ValidationErrors.args = {
    profileId: 1
};
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
