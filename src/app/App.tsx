import { ErrorBoundary } from "@/app/providers/ErrorBoundary";
import { AppRouter } from "./providers/router";
import "./styles/index.scss";

export const App = () => {
    return (
        <div className="content-page">
            <ErrorBoundary>
                <AppRouter />
            </ErrorBoundary>
        </div>
    );
};
