import { CertificatesPage } from "@/pages/CertificatesPage";
import { ConstructionObjectsPage } from "@/pages/ConstructionObjectsPage";
import { DepartmentsPage } from "@/pages/DepartmentsPage";
import { EmployeesPage } from "@/pages/EmployeesPage";
import { InspectionsPage } from "@/pages/InspectionsPage";
import { LoginPage } from "@/pages/LoginPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { SignUpPage } from "@/pages/SignUpPage";
import { RouteProps } from "react-router-dom";

export enum AppRoutes {
    LOGIN = "login",
    SIGNUP = "signup",
    PROFILE = "profile",
    INSPECTIONS = "inspections",
    CERTIFICATES = "certificates",
    CONSTRUCTION_OBJECTS = "objects",
    DEPARTMENTS = "departments",
    EMPLOYEES = "employees",

    // Несуществующий маршрут - последний!
    NOT_FOUND = "not_found",
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.LOGIN]: "/",
    [AppRoutes.SIGNUP]: "/signup",
    [AppRoutes.PROFILE]: "/profile",
    [AppRoutes.INSPECTIONS]: "/inspections",
    [AppRoutes.CERTIFICATES]: "/certificates",
    [AppRoutes.CONSTRUCTION_OBJECTS]: "/objects",
    [AppRoutes.DEPARTMENTS]: "/departments",
    [AppRoutes.EMPLOYEES]: "/employees",
    [AppRoutes.NOT_FOUND]: "*",
};

type AppRouteProps = RouteProps & {
    authOnly?: boolean;
};

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
    [AppRoutes.LOGIN]: {
        path: RoutePath.login,
        element: <LoginPage />,
    },
    [AppRoutes.SIGNUP]: {
        path: RoutePath.signup,
        element: <SignUpPage />,
    },
    [AppRoutes.PROFILE]: {
        path: RoutePath.profile,
        element: <ProfilePage />,
        authOnly: true,
    },
    [AppRoutes.INSPECTIONS]: {
        path: RoutePath.inspections,
        element: <InspectionsPage />,
        authOnly: true,
    },
    [AppRoutes.CERTIFICATES]: {
        path: RoutePath.certificates,
        element: <CertificatesPage />,
        authOnly: true,
    },
    [AppRoutes.CONSTRUCTION_OBJECTS]: {
        path: RoutePath.objects,
        element: <ConstructionObjectsPage />,
        authOnly: true,
    },
    [AppRoutes.DEPARTMENTS]: {
        path: RoutePath.departments,
        element: <DepartmentsPage />,
        authOnly: true,
    },
    [AppRoutes.EMPLOYEES]: {
        path: RoutePath.employees,
        element: <EmployeesPage />,
        authOnly: true,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};
