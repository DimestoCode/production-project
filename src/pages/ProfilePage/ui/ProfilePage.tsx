import { profileReducer, retrieveProfileData } from "entities/Profile";
import { EditableProfileCard } from "features/EditableProfileCard";
import { memo, useEffect } from "react";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Reducers, useDynamicModuleLoader } from "shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader";
import { ProfilePageHeader } from "./ProfilePageHeader/ProfilePageHeader";

const reducers: Reducers = {
    profile: profileReducer
};

const ProfilePage = memo(() => {
    useDynamicModuleLoader({ reducers, removeOnUnmount: true });

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(retrieveProfileData());
    }, [dispatch]);

    return (
        <div>
            <ProfilePageHeader />
            <EditableProfileCard />
        </div>
    );
});

export default ProfilePage;
