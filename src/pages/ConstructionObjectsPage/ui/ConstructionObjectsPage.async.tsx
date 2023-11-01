import { lazy } from "react";

export const ConstructionObjectsPageAsync = lazy(() => {
    return import("./ConstructionObjectsPage");
});
