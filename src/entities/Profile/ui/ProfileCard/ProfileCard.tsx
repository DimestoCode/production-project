import { CountrySelect } from "entities/Country";
import { CurrencySelect } from "entities/Currency";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { numbersOnlyRegExp } from "shared/lib/regExp/regExp";
import { Avatar } from "shared/ui/Avatar/Avatar";
import { Input } from "shared/ui/Input/Input";
import { Loader } from "shared/ui/Loader/Loader";
import { Text, TextTheme } from "shared/ui/Text/Text";
import { IProfile } from "../../model/types/IProfile";
import classes from "./ProfileCard.module.scss";

type ChangeHandler = (value: string, name: string) => void;

interface IProfileCardProps {
    className?: string;
    data?: IProfile;
    isLoading: boolean;
    error: string;
    onInputChange: ChangeHandler;
    onInputNumberChange: ChangeHandler;
    onSelectChange: <T extends string>(value: T, name: string) => void;
    readOnly: boolean;
}

const ProfileCardErrorState = () => {
    const { t } = useTranslation("common");
    return (
        <div className={classNames(classes.ProfileCard, {}, [classes.error])}>
            <Text
                align="center"
                text={t("Common Error Text")}
                theme={TextTheme.Error}
                title={t("Common Error Title")}
            />
        </div>
    );
};

export const ProfileCard = ({
    className,
    data,
    isLoading,
    error,
    onInputChange,
    onSelectChange,
    readOnly,
    onInputNumberChange
}: IProfileCardProps) => {
    const { t } = useTranslation(["profile"]);

    if (isLoading) {
        return (
            <div className={classNames(classes.ProfileCard, {}, [className, classes.loading])}>
                <Loader />
            </div>
        );
    }

    if (error) {
        return <ProfileCardErrorState />;
    }

    return (
        <div className={classNames(classes.ProfileCard, { [classes.edit]: !readOnly }, [className])}>
            {!!data?.avatar && (
                <div className={classes.avatarWrapper}>
                    <Avatar src={data.avatar} />
                </div>
            )}
            <Input
                className={classes.input}
                disabled={readOnly}
                name="firstName"
                onChange={onInputChange}
                placeholder={t("Your first name")}
                value={data?.firstName}
            />
            <Input
                className={classes.input}
                disabled={readOnly}
                name="lastName"
                onChange={onInputChange}
                placeholder={t("Your last name")}
                value={data?.lastName}
            />
            <Input
                className={classes.input}
                disabled={readOnly}
                name="age"
                onChange={onInputNumberChange}
                placeholder={t("Your age")}
                regExp={numbersOnlyRegExp}
                value={data?.age}
            />
            <Input
                className={classes.input}
                disabled={readOnly}
                name="city"
                onChange={onInputChange}
                placeholder={t("Your city")}
                value={data?.city}
            />
            <Input
                className={classes.input}
                disabled={readOnly}
                name="username"
                onChange={onInputChange}
                placeholder={t("Your username")}
                value={data?.username}
            />
            <Input
                className={classes.input}
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
        </div>
    );
};
