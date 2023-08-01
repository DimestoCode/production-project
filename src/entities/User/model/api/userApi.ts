import { rtkApi } from "@/shared/api/rtkApi";
import { IUser } from "../types/IUser";
import { IJSonSettings } from "../types/IJsonSettings";

interface ISetJsonSettingsArg {
    userId: number;
    jsonSettings: IJSonSettings;
}
export const userApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        setJsonSettings: build.mutation<IUser, ISetJsonSettingsArg>({
            query: ({ jsonSettings, userId }) => ({
                url: `/users/${userId}`,
                method: "PATCH",
                body: {
                    jsonSettings
                }
            })
        })
    })
});
