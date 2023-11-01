import { lazy } from "react";

export const EmployeesPageAsync = lazy(() => {
    return import("./EmployeesPage");
});
