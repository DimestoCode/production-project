import { profileReducer, retrieveProfileData } from "entities/Profile";
import { EditableProfileCard } from "features/EditableProfileCard";
import { memo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useActionEffect } from "shared/lib/hooks/useActionEffect/useActionEffect";
import { Reducers, useDynamicModuleLoader } from "shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader";
import { Page } from "widgets/Page";
import { ProfilePageHeader } from "./ProfilePageHeader/ProfilePageHeader";

const reducers: Reducers = {
    profile: profileReducer
};

const ProfilePage = memo(() => {
    const { profileId } = useParams<{ profileId: string }>();
    const fetchProfileCallback = useCallback(() => retrieveProfileData(Number(profileId)), [profileId]);

    useDynamicModuleLoader({ reducers, removeOnUnmount: true });
    useActionEffect(fetchProfileCallback);

    return (
        <Page>
            <ProfilePageHeader />
            <EditableProfileCard />
        </Page>
    );
});

export default ProfilePage;
