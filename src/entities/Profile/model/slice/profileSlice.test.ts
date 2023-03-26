import { Country } from "entities/Country";
import { Currency } from "entities/Currency";
import ProfileImg from "shared/assets/tests/profile.jpg";
import { updateProfileData } from "entities/Profile";
import { IProfile, IProfileState, ProfileValidationError } from "../types/IProfile";
import { profileActions, profileReducer } from "./profileSlice";
import { retrieveProfileData } from "../services/retrieveProfileData/retrieveProfileData";

const data: IProfile = {
    username: "admin",
    age: 22,
    city: "NY",
    country: Country.USA,
    currency: Currency.USD,
    firstName: "Dima",
    lastName: "Andoniev",
    avatar: ProfileImg
};

describe("profileSlice", () => {
    test("setReadOnly", () => {
        const state: DeepPartial<IProfileState> = {
            readonly: false
        };
        const res = profileReducer(state as IProfileState, profileActions.setReadOnly(true));
        expect(res).toStrictEqual<DeepPartial<IProfileState>>({
            readonly: true
        });
    });

    test("cancelEdit", () => {
        const state: DeepPartial<IProfileState> = {
            readonly: false,
            data,
            form: undefined,
            validationErrors: []
        };
        const res = profileReducer(state as IProfileState, profileActions.cancelEdit());
        expect(res).toStrictEqual<DeepPartial<IProfileState>>({
            readonly: true,
            form: data,
            data,
            validationErrors: undefined
        });
    });

    test("updateProfile", () => {
        const state: DeepPartial<IProfileState> = {
            form: data
        };

        expect(
            profileReducer(state as IProfileState, profileActions.updateProfile({ firstName: "updated" }))
        ).toStrictEqual<DeepPartial<IProfileState>>({ form: { ...data, firstName: "updated" } });
    });

    test("retrieveProfileData pending", () => {
        const state: DeepPartial<IProfileState> = {};
        const res = profileReducer(state as IProfileState, retrieveProfileData.pending);
        expect(res).toStrictEqual<DeepPartial<IProfileState>>({
            error: undefined,
            isLoading: true
        });
    });

    test("retrieveProfileData fulfilled", () => {
        const state: DeepPartial<IProfileState> = {};
        expect(
            profileReducer(state as IProfileState, { type: retrieveProfileData.fulfilled, payload: data })
        ).toStrictEqual<DeepPartial<IProfileState>>({
            isLoading: false,
            data,
            form: data
        });
    });

    test("retrieveProfileData rejected", () => {
        const state: DeepPartial<IProfileState> = {};
        expect(
            profileReducer(state as IProfileState, { type: retrieveProfileData.rejected, payload: "Error" })
        ).toStrictEqual<DeepPartial<IProfileState>>({
            isLoading: false,
            error: "Error"
        });
    });

    test("updateProfileData pending", () => {
        const state: DeepPartial<IProfileState> = {};
        const res = profileReducer(state as IProfileState, updateProfileData.pending);
        expect(res).toStrictEqual<DeepPartial<IProfileState>>({
            validationErrors: undefined,
            isLoading: true
        });
    });

    test("updateProfileData fulfilled", () => {
        const state: DeepPartial<IProfileState> = {};
        expect(
            profileReducer(state as IProfileState, { type: updateProfileData.fulfilled, payload: data })
        ).toStrictEqual<DeepPartial<IProfileState>>({
            isLoading: false,
            data,
            form: data,
            readonly: true
        });
    });

    test("updateProfileData rejected", () => {
        const state: DeepPartial<IProfileState> = {};
        expect(
            profileReducer(state as IProfileState, {
                type: updateProfileData.rejected,
                payload: [ProfileValidationError.IncorrectAge]
            })
        ).toStrictEqual<DeepPartial<IProfileState>>({
            isLoading: false,
            validationErrors: [ProfileValidationError.IncorrectAge]
        });
    });
});
