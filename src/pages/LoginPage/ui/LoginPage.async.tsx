import { lazy } from "react";
import "./LoginPage";

// Искуственная задержка
// export const LoginPageAsync = lazy(() => {
//     return Promise.all([
//         import("./LoginPage"),
//         new Promise((resolve) => setTimeout(resolve, 2000)),
//     ]).then(([moduleExports]) => moduleExports);
// });

// ВОЗМОЖНО ЭТОТ ВАРИАНТ ПРАВИЛЬНЫЙ
// export const LoginPageAsync = lazy(() => {
//     return import("./LoginPage").then((moduleExports) => moduleExports);
// });

export const LoginPageAsync = lazy(() => {
    return import("./LoginPage");
});
