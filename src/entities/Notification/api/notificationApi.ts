import { rtkApi } from "shared/api/rtkApi";
import { INotification } from "../model/types/INotification";

const notificationApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getNotifications: build.query<INotification[], void>({
            query: () => ({
                url: "/notifications"
            })
        })
    })
});

export const useNotifications = notificationApi.useGetNotificationsQuery;
