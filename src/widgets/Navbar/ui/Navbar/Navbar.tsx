import { lazy, memo, useCallback, useState } from "react";
import { useUserAuthData } from "@/entities/User";
import { ToggleFeatures } from "@/shared/lib/features";

const RedesignedNavbar = lazy(() =>
    import("../RedesignedNavbar/RedesignedNavbar").then((mod) => ({ default: mod.RedesignedNavbar }))
);
const DeprecatedNavbar = lazy(() =>
    import("../DeprecatedNavbar/DeprecatedNavbar").then((mod) => ({ default: mod.DeprecatedNavbar }))
);

interface INavBarProps {
    className?: string;
}

export const Navbar = memo<INavBarProps>(({ className = "" }: INavBarProps) => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const authData = useUserAuthData();

    const toggleModal = useCallback(() => {
        setIsLoginModalOpen((isOpen) => !isOpen);
    }, []);

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <DeprecatedNavbar
                    authData={authData}
                    className={className}
                    isLoginModalOpen={isLoginModalOpen}
                    toggleModal={toggleModal}
                />
            }
            on={
                <RedesignedNavbar
                    authData={authData}
                    className={className}
                    isLoginModalOpen={isLoginModalOpen}
                    toggleModal={toggleModal}
                />
            }
        />
    );
});
