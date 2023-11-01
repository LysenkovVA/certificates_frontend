import { lazy } from "react";

export const DepartmentsPageAsync = lazy(() => {
    return import("./DepartmentsPage");
});
