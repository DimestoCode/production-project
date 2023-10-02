import { memo } from "react";
import { MainLayout } from "../MainLayout";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { Skeleton } from "@/shared/ui/redesigned/Skeleton";

export const AppLoaderLayout = memo(() => {
    return (
        <MainLayout
            content={
                <VStack gap="16" style={{ height: "100%" }}>
                    <Skeleton borderRadius="16px" height={32} width="70%" />
                    <Skeleton borderRadius="16px" height={20} width="40%" />
                    <Skeleton borderRadius="16px" height={20} width="50%" />
                    <Skeleton borderRadius="16px" height={32} width="30%" />
                    <Skeleton borderRadius="16px" height="40%" width="80%" />
                    <Skeleton borderRadius="16px" height="40%" width="80%" />
                </VStack>
            }
            header={
                <HStack style={{ padding: "16px" }}>
                    <Skeleton borderRadius="50%" height={40} width={40} />
                </HStack>
            }
            sidebar={<Skeleton borderRadius="32px" height="100%" width={220} />}
        />
    );
});
