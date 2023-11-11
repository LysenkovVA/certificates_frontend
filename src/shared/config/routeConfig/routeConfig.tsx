import { CertificatesPage } from "@/pages/CertificatesPage";
import { ConstructionObjectsPage } from "@/pages/ConstructionObjectsPage";
import { DepartmentsPage } from "@/pages/DepartmentsPage";
import { EmployeeDetailsPage } from "@/pages/EmployeeDetailsPage";
import { EmployeesPage } from "@/pages/EmployeesPage";
import { InspectionsPage } from "@/pages/InspectionsPage";
import { LoginPage } from "@/pages/LoginPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { OrganizationsPage } from "@/pages/OrganizationsPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { SignUpPage } from "@/pages/SignUpPage";
import { RouteProps } from "react-router-dom";

export enum AppRoutes {
    LOGIN = "login",
    SIGNUP = "signup",
    PROFILE = "profile",
    INSPECTIONS = "inspections",
    CERTIFICATES = "certificates",
    ORGANIZATIONS = "organizations",
    CONSTRUCTION_OBJECTS = "objects",
    DEPARTMENTS = "departments",
    EMPLOYEES = "employees",
    EMPLOYEE_DETAILS = "employee_details",

    // Несуществующий маршрут - последний!
    NOT_FOUND = "not_found",
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.LOGIN]: "/",
    [AppRoutes.SIGNUP]: "/signup",
    [AppRoutes.PROFILE]: "/profile",
    [AppRoutes.INSPECTIONS]: "/inspections",
    [AppRoutes.CERTIFICATES]: "/certificates",
    [AppRoutes.ORGANIZATIONS]: "/organizations",
    [AppRoutes.CONSTRUCTION_OBJECTS]: "/objects",
    [AppRoutes.DEPARTMENTS]: "/departments",
    [AppRoutes.EMPLOYEES]: "/employees",
    [AppRoutes.EMPLOYEE_DETAILS]: "/employees/", // +id
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
    [AppRoutes.ORGANIZATIONS]: {
        path: RoutePath.organizations,
        element: <OrganizationsPage />,
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
    [AppRoutes.EMPLOYEE_DETAILS]: {
        path: `${RoutePath.employee_details}:id`,
        element: <EmployeeDetailsPage />,
        authOnly: true,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};
