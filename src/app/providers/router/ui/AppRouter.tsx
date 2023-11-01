import { routeConfig } from "@/shared/config/routeConfig/routeConfig";
import { PageLoader } from "@/widgets/PageLoader";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const AppRouter = () => {
    return (
        <Routes>
            {Object.values(routeConfig).map(({ element, path }) => (
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

export default AppRouter;
