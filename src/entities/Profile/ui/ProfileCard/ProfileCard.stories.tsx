import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Theme } from "app/providers/ThemeProvider";
import { Country } from "entities/Country";
import { Currency } from "entities/Currency";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import ProfileImg from "shared/assets/tests/profile.jpg";
import { ProfileCard } from "./ProfileCard";

export default {
    title: "entities/ProfileCard",
    component: ProfileCard,
    argTypes: {
        backgroundColor: { control: "color" }
    }
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const WithData = Template.bind({});
WithData.args = {
    data: {
        username: "admin",
        age: 22,
        city: "NY",
        country: Country.USA,
        currency: Currency.USD,
        firstName: "Dima",
        lastName: "Andoniev",
        avatar: ProfileImg
    }
};

export const WithDataDark = Template.bind({});
WithDataDark.args = {
    data: {
        username: "admin",
        age: 22,
        city: "NY",
        country: Country.USA,
        currency: Currency.USD,
        firstName: "Dima",
        lastName: "Andoniev",
        avatar: ProfileImg
    }
};
WithDataDark.decorators = [ThemeDecorator(Theme.Dark)];

export const Loading = Template.bind({});
Loading.args = {
    isLoading: true
};

export const Error = Template.bind({});
Error.args = {
    error: "Something went wrong"
};
