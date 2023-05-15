import { getUserRoles, UserRole } from "entities/User";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { RoutePath } from "shared/config/routeConfig/routeConfig";

interface IRequireRolesProps {
    routeRoles?: UserRole[];
    children: JSX.Element;
}

export const RequireRoles = ({ routeRoles, children }: IRequireRolesProps) => {
    const userRoles = useSelector(getUserRoles);
    const location = useLocation();
    const hasRequiredRoles = routeRoles?.some((role) => userRoles?.includes(role));

    if (routeRoles && !hasRequiredRoles) {
        return <Navigate state={{ from: location }} to={RoutePath.forbidden} replace />;
    }

    return children;
};
