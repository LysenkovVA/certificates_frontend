import { lazy } from "react";

export const CertificatesPageAsync = lazy(() => {
    return import("./CertificatesPage");
});
