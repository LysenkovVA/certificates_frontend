import { ErrorBoundary } from "@/app/providers/ErrorBoundary";
import { userActions } from "@/entities/User/model/slice/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppRouter } from "./providers/router";
import "./styles/index.scss";

export const App = () => {
    const dispatch = useDispatch();

    // Загружаем информацию об авторизованном пользователе
    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    return (
        <div className="content-page">
            <ErrorBoundary>
                <AppRouter />
            </ErrorBoundary>
        </div>
    );
};
