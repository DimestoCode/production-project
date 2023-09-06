import { IProfileCardProps } from "../../model/types/IProfile";
import { ToggleFeatures } from "@/shared/lib/features";
import {
    ProfileCardDeprecated,
    ProfileCardDeprecatedError,
    ProfileCardDeprecatedLoader
} from "../ProfileCardDeprecated/ProfileCardDeprecated";
import {
    ProfileCardRedesigned,
    ProfileCardRedesignedError,
    ProfileCardRedesignedSkeleton
} from "../ProfileCardRedesigned/ProfileCardRedesigned";

export const ProfileCard = ({ isLoading, error, ...rest }: IProfileCardProps) => {
    if (isLoading) {
        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                off={<ProfileCardDeprecatedLoader className={rest.className} />}
                on={<ProfileCardRedesignedSkeleton />}
            />
        );
    }

    if (error) {
        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                off={<ProfileCardDeprecatedError />}
                on={<ProfileCardRedesignedError />}
            />
        );
    }

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={<ProfileCardDeprecated {...rest} />}
            on={<ProfileCardRedesigned {...rest} />}
        />
    );
};
