import { memo, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import isNil from "lodash/isNil";
import { ListBox } from "@/shared/ui/redesigned/Popups";
import { getFeatureFlag, toggleFeatures } from "@/shared/lib/features";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { updateFeatureFlags } from "@/shared/lib/features/services/updateFeatureFlags";
import { useUserAuthData } from "@/entities/User";
import { ListBox as ListBoxDeprecated } from "@/shared/ui/deprecated/Popups";
import { HStack } from "@/shared/ui/redesigned/Stack";
import { Text } from "@/shared/ui/redesigned/Text";
import { Text as TextDeprecated } from "@/shared/ui/deprecated/Text";
import { Skeleton } from "@/shared/ui/redesigned/Skeleton";
import { Skeleton as SkeletonDeprecated } from "@/shared/ui/deprecated/Skeleton";

interface IUiDesignedSwitcherProps {
    className?: string;
}

export const UiDesignedSwitcher = memo(({ className }: IUiDesignedSwitcherProps) => {
    const { t } = useTranslation("settings");
    const [isLoading, setIsLoading] = useState(false);
    const isAppRedesigned = getFeatureFlag("isAppRedesigned");
    const dispatch = useAppDispatch();
    const authData = useUserAuthData();
    const items = [
        {
            value: "new",
            label: t("new")
        },
        {
            value: "old",
            label: t("old")
        }
    ];
    const onChange = async (value: string) => {
        if (!isNil(authData)) {
            setIsLoading(true);
            await dispatch(
                updateFeatureFlags({
                    userId: authData.id,
                    newFeatures: {
                        isAppRedesigned: value === "new"
                    }
                })
            ).unwrap();
            setIsLoading(false);
        }
    };

    const ListBoxComponent = useMemo(
        () => toggleFeatures({ name: "isAppRedesigned", on: () => ListBox, off: () => ListBoxDeprecated }),
        []
    );

    const TextComponent = useMemo(
        () => toggleFeatures({ name: "isAppRedesigned", on: () => Text, off: () => TextDeprecated }),
        []
    );

    const SkeletonComponent = useMemo(
        () => toggleFeatures({ name: "isAppRedesigned", on: () => Skeleton, off: () => SkeletonDeprecated }),
        []
    );

    return (
        <HStack gap="8">
            <TextComponent text={t("Interface")} />
            {isLoading ? (
                <SkeletonComponent height={40} width={300} />
            ) : (
                <ListBoxComponent
                    className={className}
                    // label={t("Interface")}
                    onChange={onChange}
                    options={items}
                    value={isAppRedesigned ? "new" : "old"}
                />
            )}
        </HStack>
    );
});
