import { memo } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./ProfileCardDeprecated.module.scss";
import { CountrySelect } from "@/entities/Country";
import { CurrencySelect } from "@/entities/Currency";
import { numbersOnlyRegExp } from "@/shared/lib/regExp/regExp";
import { Avatar } from "@/shared/ui/deprecated/Avatar";
import { Input } from "@/shared/ui/deprecated/Input";
import { Text, TextTheme } from "@/shared/ui/deprecated/Text";
import { VStack, HStack } from "@/shared/ui/redesigned/Stack";
import { IProfileCardProps } from "../../model/types/IProfile";
import { Loader } from "@/shared/ui/deprecated/Loader";

export const ProfileCardDeprecated = memo(
    ({
        className,
        onInputChange,
        onInputNumberChange,
        onSelectChange,
        readOnly,
        data
    }: Omit<IProfileCardProps, "error" | "isLoading">) => {
        const { t } = useTranslation("profile");

        return (
            <VStack
                className={classNames(classes.ProfileCard, { [classes.edit]: !readOnly }, [className])}
                gap="8"
                maxWidth
            >
                {!!data?.avatar && (
                    <HStack className={classes.avatarWrapper} justify="center" maxWidth>
                        <Avatar src={data.avatar} />
                    </HStack>
                )}
                <Input
                    className={classes.input}
                    data-testid="ProfileCard.firstName"
                    disabled={readOnly}
                    name="firstName"
                    onChange={onInputChange}
                    placeholder={t("Your first name")}
                    value={data?.firstName}
                />
                <Input
                    className={classes.input}
                    data-testid="ProfileCard.lastName"
                    disabled={readOnly}
                    name="lastName"
                    onChange={onInputChange}
                    placeholder={t("Your last name")}
                    value={data?.lastName}
                />
                <Input
                    className={classes.input}
                    data-testid="ProfileCard.age"
                    disabled={readOnly}
                    name="age"
                    onChange={onInputNumberChange}
                    placeholder={t("Your age")}
                    regExp={numbersOnlyRegExp}
                    value={data?.age}
                />
                <Input
                    className={classes.input}
                    data-testid="ProfileCard.city"
                    disabled={readOnly}
                    name="city"
                    onChange={onInputChange}
                    placeholder={t("Your city")}
                    value={data?.city}
                />
                <Input
                    className={classes.input}
                    data-testid="ProfileCard.username"
                    disabled={readOnly}
                    name="username"
                    onChange={onInputChange}
                    placeholder={t("Your username")}
                    value={data?.username}
                />
                <Input
                    className={classes.input}
                    data-testid="ProfileCard.avatar"
                    disabled={readOnly}
                    name="avatar"
                    onChange={onInputChange}
                    placeholder={t("Your avatar")}
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
        );
    }
);

export const ProfileCardDeprecatedLoader = ({ className }: { className?: string }) => {
    return (
        <VStack className={classNames(classes.ProfileCard, {}, [className, classes.loading])} maxWidth>
            <Loader />
        </VStack>
    );
};

export const ProfileCardDeprecatedError = () => {
    const { t } = useTranslation("common");
    return (
        <HStack className={classNames(classes.ProfileCard, {}, [classes.error])} justify="center" maxWidth>
            <Text
                align="center"
                text={t("Common Error Text")}
                theme={TextTheme.Error}
                title={t("Common Error Title")}
            />
        </HStack>
    );
};
