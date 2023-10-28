import { LoginPage } from "@/pages/LoginPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { SignUpPage } from "@/pages/SignUpPage";
import { RouteProps } from "react-router-dom";

export enum AppRoutes {
    LOGIN = "login",
    SIGNUP = "signup",
    PROFILE = "profile",

    // Несуществующий маршрут - последний!
    NOT_FOUND = "not_found",
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.LOGIN]: "/",
    [AppRoutes.SIGNUP]: "/signup",
    [AppRoutes.PROFILE]: "/profile",
    [AppRoutes.NOT_FOUND]: "*",
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
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
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};
