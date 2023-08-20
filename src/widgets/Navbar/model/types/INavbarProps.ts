import { IUser } from "@/entities/User";

export interface INavbarProps {
    authData: IUser | undefined;
    isLoginModalOpen: boolean;
    toggleModal: () => void;
    className?: string;
}
