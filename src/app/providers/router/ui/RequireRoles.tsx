import { Navigate, useLocation } from "react-router-dom";
import { ReactElement } from "react";
import { UserRole, useUserRoles } from "@/entities/User";
import { getRouteForbidden } from "@/shared/const/router";

interface IRequireRolesProps {
    routeRoles?: UserRole[];
    children: ReactElement<any, any> | null;
}

export const RequireRoles = ({ routeRoles, children }: IRequireRolesProps) => {
    const userRoles = useUserRoles();
    const location = useLocation();
    const hasRequiredRoles = routeRoles?.some((role) => userRoles?.includes(role));

    if (routeRoles && !hasRequiredRoles) {
        return <Navigate state={{ from: location }} to={getRouteForbidden()} replace />;
    }

    return children;
};
