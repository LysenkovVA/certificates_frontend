import "devextreme/dist/css/dx.light.css";
import { AppRouter } from "./providers/router";
import "./styles/index.scss";

export const App = () => {
    return (
        <div className="content-page">
            <AppRouter />
        </div>
    );
};
