import { ComponentStory, ComponentMeta } from "@storybook/react";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { UserMenu } from "./UserMenu";
import { IUserState, UserRole } from "@/entities/User/testing";

export default {
    title: "features/UserMenu",
    component: UserMenu,
    argTypes: {
        backgroundColor: { control: "color" }
    }
} as ComponentMeta<typeof UserMenu>;

const Template: ComponentStory<typeof UserMenu> = () => (
    <div style={{ padding: 250 }}>
        <UserMenu />
    </div>
);

const user: IUserState = {
    _initialized: true,
    authData: {
        avatar: "https://i.pinimg.com/564x/d4/28/bb/d428bb4dff60cf6df9b282ce58efcade.jpg",
        id: 1,
        roles: [UserRole.Admin],
        username: "User"
    }
};

export const Authenticated = Template.bind({});
Authenticated.decorators = [
    StoreDecorator({
        user
    })
];

export const NonAuthenticated = Template.bind({});
NonAuthenticated.decorators = [
    StoreDecorator({
        user
    })
];
