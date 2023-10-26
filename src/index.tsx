import StoreProvider from "@/app/providers/StoreProvider/ui/StoreProvider";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./app/App";

// Render your React component instead
const root = createRoot(document.getElementById("root"));
root.render(
    <StoreProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StoreProvider>,
);
