import { memo } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./ProfileCardRedesigned.module.scss";
import { IProfileCardProps } from "../../model/types/IProfile";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { Input } from "@/shared/ui/redesigned/Input";
import { numbersOnlyRegExp } from "@/shared/lib/regExp/regExp";
import { CountrySelect } from "@/entities/Country";
import { CurrencySelect } from "@/entities/Currency";
import { Card } from "@/shared/ui/redesigned/Card";
import { Avatar } from "@/shared/ui/redesigned/Avatar";
import { Skeleton } from "@/shared/ui/redesigned/Skeleton";
import { Text } from "@/shared/ui/redesigned/Text";

export const ProfileCardRedesigned = memo(
    ({
        onInputChange,
        onInputNumberChange,
        onSelectChange,
        readOnly,
        data
    }: Omit<IProfileCardProps, "error" | "isLoading">) => {
        const { t } = useTranslation("profile");
        return (
            <Card padding="24" fullWidth>
                <VStack gap="32" maxWidth>
                    {!!data?.avatar && (
                        <HStack className={classes.avatarWrapper} justify="center" maxWidth>
                            <Avatar size={120} src={data.avatar} />
                        </HStack>
                    )}

                    <HStack gap="24" maxWidth>
                        <VStack gap="16" maxWidth>
                            <Input
                                className={classes.input}
                                data-testid="ProfileCard.firstName"
                                disabled={readOnly}
                                label={t("Your first name")}
                                name="firstName"
                                onChange={onInputChange}
                                value={data?.firstName}
                            />
                            <Input
                                className={classes.input}
                                data-testid="ProfileCard.lastName"
                                disabled={readOnly}
                                label={t("Your last name")}
                                name="lastName"
                                onChange={onInputChange}
                                value={data?.lastName}
                            />
                            <Input
                                className={classes.input}
                                data-testid="ProfileCard.age"
                                disabled={readOnly}
                                label={t("Your age")}
                                name="age"
                                onChange={onInputNumberChange}
                                regExp={numbersOnlyRegExp}
                                value={data?.age}
                            />
                            <Input
                                className={classes.input}
                                data-testid="ProfileCard.city"
                                disabled={readOnly}
                                label={t("Your city")}
                                name="city"
                                onChange={onInputChange}
                                value={data?.city}
                            />
                        </VStack>
                        <VStack gap="16" maxWidth>
                            <Input
                                className={classes.input}
                                data-testid="ProfileCard.username"
                                disabled={readOnly}
                                label={t("Your username")}
                                name="username"
                                onChange={onInputChange}
                                value={data?.username}
                            />
                            <Input
                                className={classes.input}
                                data-testid="ProfileCard.avatar"
                                disabled={readOnly}
                                label={t("Your avatar")}
                                name="avatar"
                                onChange={onInputChange}
                                value={data?.avatar}
                            />
                            <CurrencySelect
                                className={classes.input}
                                disabled={readOnly}
                                label={t("Currency")}
                                onChange={onSelectChange}
                                value={data?.currency}
                            />
                            <CountrySelect
                                className={classes.input}
                                disabled={readOnly}
                                label={t("Country")}
                                onChange={onSelectChange}
                                value={data?.country}
                            />
                        </VStack>
                    </HStack>
                </VStack>
            </Card>
        );
    }
);

export const ProfileCardRedesignedSkeleton = () => {
    return (
        <Card padding="24" fullWidth>
            <VStack gap="32" maxWidth>
                <VStack gap="32" maxWidth>
                    <HStack justify="center" maxWidth>
                        <Skeleton borderRadius="50%" height={128} width={128} />
                    </HStack>
                </VStack>
                <HStack gap="32" maxWidth>
                    <VStack gap="16" maxWidth>
                        <Skeleton height={38} width="100%" />
                        <Skeleton height={38} width="100%" />
                        <Skeleton height={38} width="100%" />
                        <Skeleton height={38} width="100%" />
                    </VStack>
                    <VStack gap="16" maxWidth>
                        <Skeleton height={38} width="100%" />
                        <Skeleton height={38} width="100%" />
                        <Skeleton height={38} width="100%" />
                        <Skeleton height={38} width="100%" />
                    </VStack>
                </HStack>
            </VStack>
        </Card>
    );
};

export const ProfileCardRedesignedError = () => {
    const { t } = useTranslation("common");

    return (
        <HStack className={classNames(classes.ProfileCard, {}, [classes.error])} justify="center" maxWidth>
            <Text align="center" text={t("Common Error Text")} title={t("Common Error Title")} variant="error" />
        </HStack>
    );
};
