import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { EditableProfileCard } from "@/features/EditableProfileCard";
import { Text } from "@/shared/ui/deprecated/Text";
import { Page } from "@/widgets/Page";

const ProfilePage = memo(() => {
    const { t } = useTranslation("profile");
    const { profileId } = useParams<{ profileId: string }>();

    if (!profileId) {
        return <Text title={t("Profile not found")} />;
    }

    // TODO: Profile Rating
    return (
        <Page data-testid="profile-page">
            <EditableProfileCard profileId={Number(profileId)} />
        </Page>
    );
});

export default ProfilePage;
