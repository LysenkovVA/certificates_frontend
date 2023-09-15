import { LoginPage } from "@/pages/LoginPage";
import { RouteProps } from "react-router-dom";

export enum AppRoutes {
    LOGIN = "login",
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.LOGIN]: "/",
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.LOGIN]: {
        path: RoutePath.login,
        element: <LoginPage />,
    },
};
