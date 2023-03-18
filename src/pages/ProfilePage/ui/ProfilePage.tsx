import { ProfileCard, profileReducer, retrieveProfileData } from "entities/Profile";
import { memo, useEffect } from "react";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Reducers, useDynamicModuleLoader } from "shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader";

const reducers: Reducers = {
    profile: profileReducer
};

const ProfilePage = memo(() => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(retrieveProfileData());
    }, [dispatch]);

    useDynamicModuleLoader({ reducers, removeOnUnmount: true });
    return (
        <div>
            <ProfileCard />
        </div>
    );
});

export default ProfilePage;
