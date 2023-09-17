import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Text } from "@/shared/ui/redesigned/Text";
import { Page } from "@/widgets/Page";
import { UiDesignedSwitcher } from "@/features/UiDesignedSwitcher";

const SettingsPage = memo(() => {
    const { t } = useTranslation("settings");

    return (
        <Page>
            <Text title={t("User Settings")} />
            <UiDesignedSwitcher />
        </Page>
    );
});

export default SettingsPage;
