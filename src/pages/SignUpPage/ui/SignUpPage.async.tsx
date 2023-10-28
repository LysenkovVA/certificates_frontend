import { lazy } from "react";
import "./SignUpPage";

export const SignUpPageAsync = lazy(() => {
    return import("./SignUpPage");
});
