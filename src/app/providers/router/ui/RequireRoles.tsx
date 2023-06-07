import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { getUserRoles, UserRole } from "@/entities/User";
import { RoutePath } from "@/shared/const/router";

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
