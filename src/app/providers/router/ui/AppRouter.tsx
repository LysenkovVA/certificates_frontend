import { getAuthenticatedUser } from "@/entities/User";
import { routeConfig } from "@/shared/config/routeConfig/routeConfig";
import { PageLoader } from "@/widgets/PageLoader";
import { memo, Suspense, useMemo } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

const AppRouter = () => {
    const user = useSelector(getAuthenticatedUser);

    // Если пользователь не будет авторизован, выпиливаем маршруты для
    // авторизованных пользователей
    const routes = useMemo(() => {
        return Object.values(routeConfig).filter((route) => {
            if (route.authOnly && !user?.id) {
                return false;
            }

            return true;
        });
    }, [user]);

    return (
        <Routes>
            {routes.map(({ element, path }) => (
                <Route
                    key={path}
                    path={path}
                    element={
                        <Suspense fallback={<PageLoader />}>{element}</Suspense>
                    }
                />
            ))}
        </Routes>
    );
};

export default memo(AppRouter);
