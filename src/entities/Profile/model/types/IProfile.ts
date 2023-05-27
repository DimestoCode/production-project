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
