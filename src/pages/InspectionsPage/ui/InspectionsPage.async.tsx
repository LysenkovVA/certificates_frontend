import { lazy } from "react";

export const InspectionsPageAsync = lazy(() => {
    return import("./InspectionsPage");
});
