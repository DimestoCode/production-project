import { Country } from "@/entities/Country";
import { Currency } from "@/entities/Currency";

export interface IProfile {
    id?: number;
    firstName?: string;
    lastName?: string;
    age?: number;
    currency?: Currency;
    country?: Country;
    city?: string;
    username?: string;
    avatar?: string;
}

type ChangeHandler = (value: string, name: string) => void;

export interface IProfileCardProps {
    className?: string;
    data?: IProfile;
    isLoading: boolean;
    error: string;
    onInputChange: ChangeHandler;
    onInputNumberChange: ChangeHandler;
    onSelectChange: <T extends string>(value: T, name: string) => void;
    readOnly: boolean;
}
