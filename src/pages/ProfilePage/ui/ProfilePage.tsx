import { profileReducer } from "entities/Profile";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Reducers, useDynamicModuleLoader } from "shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader";

const reducers: Reducers = {
    profile: profileReducer
};
const ProfilePage = memo(() => {
    const { t } = useTranslation("profile");
    useDynamicModuleLoader({ reducers, removeOnUnmount: true });
    return <div>{t("Profile Page")}</div>;
});

export default ProfilePage;
