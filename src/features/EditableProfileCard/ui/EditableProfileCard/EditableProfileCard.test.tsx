import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Country } from "entities/Country";
import { Currency } from "entities/Currency";
import { IProfile } from "entities/Profile";
import { renderTestComponent } from "shared/lib/tests/renderComponent";
import { $api } from "shared/api/api";
import { cloneDeep, set } from "lodash";
import { profileReducer } from "../../model/slices/profileSlice";
import { EditableProfileCard } from "./EditableProfileCard";

const profile: IProfile = {
    age: 10,
    avatar: "",
    city: "New York",
    country: Country.France,
    currency: Currency.EUR,
    firstName: "Dima",
    id: 1,
    lastName: "Andoniev",
    username: "dando"
};

const options = {
    initialState: {
        profile: {
            readonly: true,
            data: profile,
            form: profile
        },
        user: {
            authData: {
                username: "dando",
                id: 1
            }
        }
    },
    asyncReducers: {
        profile: profileReducer
    }
};

describe("EditableProfileCard", () => {
    beforeEach(() => {
        jest.spyOn($api, "get").mockResolvedValue({ data: profile });
    });

    test("switch form modes from readonly to edit", async () => {
        renderTestComponent(<EditableProfileCard profileId={1} />, options);

        const editBtn = await screen.findByTestId("EditableProfileCardHeader.EditButton");
        await userEvent.click(editBtn);

        const cancelBtn = screen.getByTestId("EditableProfileCardHeader.CancelButton");
        expect(cancelBtn).toBeInTheDocument();
    });

    test("clicking cancel reverts form to default state", async () => {
        const clonedOptions = cloneDeep(options);
        renderTestComponent(
            <EditableProfileCard profileId={1} />,
            set(clonedOptions, "initialState.profile.readonly", false)
        );

        const cancelBtn = await screen.findByTestId("EditableProfileCardHeader.CancelButton");
        expect(cancelBtn).toBeInTheDocument();

        const firstName = screen.getByTestId("ProfileCard.firstName");
        await userEvent.type(firstName, "new values");

        const lastName = screen.getByTestId("ProfileCard.lastName");
        await userEvent.type(lastName, "new values");

        expect(firstName).toHaveValue(`${profile.firstName}new values`);
        expect(lastName).toHaveValue(`${profile.lastName}new values`);

        await userEvent.click(cancelBtn);
        expect(firstName).toHaveValue(profile.firstName);
        expect(lastName).toHaveValue(profile.lastName);
    });

    test("Incorrect Name error appears upon form saving with empty first name", async () => {
        const clonedOptions = cloneDeep(options);
        renderTestComponent(
            <EditableProfileCard profileId={1} />,
            set(clonedOptions, "initialState.profile.readonly", false)
        );

        const firstName = await screen.findByTestId("ProfileCard.firstName");
        await userEvent.clear(firstName);

        const saveBtn = screen.getByTestId("EditableProfileCardHeader.SaveButton");
        await userEvent.click(saveBtn);

        const error = screen.getByTestId("EditableProfileCard.Error.Text");

        expect(error).toHaveTextContent("Incorrect Name");
    });

    test.only("successfully submits data to server", async () => {
        const clonedOptions = cloneDeep(options);

        const mockedPut = jest.spyOn($api, "put");
        renderTestComponent(
            <EditableProfileCard profileId={1} />,
            set(clonedOptions, "initialState.profile.readonly", false)
        );

        const firstName = await screen.findByTestId("ProfileCard.firstName");
        await userEvent.type(firstName, "d");

        const saveBtn = screen.getByTestId("EditableProfileCardHeader.SaveButton");
        await userEvent.click(saveBtn);

        expect(mockedPut).toHaveBeenCalled();
    });
});