import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Text } from "@/shared/ui/redesigned/Text";
import { Page } from "@/widgets/Page";
import { UiDesignedSwitcher } from "@/features/UiDesignedSwitcher";
import { VStack } from "@/shared/ui/redesigned/Stack";

const SettingsPage = memo(() => {
    const { t } = useTranslation("settings");

    return (
        <Page>
            <VStack gap="16" maxWidth>
                <Text title={t("User Settings")} />
                <UiDesignedSwitcher />
            </VStack>
        </Page>
    );
});

export default SettingsPage;
