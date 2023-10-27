import { AppDispatch } from "@/app/providers/StoreProvider";
import { getAuthenticatedUser } from "@/entities/User/model/selectors/getAuthenticatedUser/getAuthenticatedUser";
import { authActions, authByEmail, getAuth } from "@/features/auth";
import logo from "@/shared/assets/logo/crane.png";
import { Alert, Button, Flex, Image, Input } from "antd";
import { memo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface FieldType {
    username?: string;
    password?: string;
    remember?: string;
}

export const Authorization = memo(() => {
    const dispatch = useDispatch<AppDispatch>();
    const { email, password, isLoading, error } = useSelector(getAuth);
    const user = useSelector(getAuthenticatedUser);

    const navigate = useNavigate();

    useEffect(() => {
        if (user?.token) {
            dispatch(authActions.setEmail(""));
            dispatch(authActions.setPassword(""));
            navigate("/profile");
        }
    }, [user, navigate, dispatch]);

    const onChangeEmail = useCallback(
        (value: string) => {
            dispatch(authActions.setEmail(value));
        },
        [dispatch],
    );

    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(authActions.setPassword(value));
        },
        [dispatch],
    );
    const onLogin = useCallback(async () => {
        await dispatch(authByEmail({ email, password }));
    }, [dispatch, email, password]);

    return (
        <>
            <Flex
                align={"center"}
                gap={"small"}
                vertical
                style={{ width: "40%", marginTop: "5%" }}
            >
                <Image src={logo} width={100} height={100} preview={false} />
                <Input
                    title={"E-mail"}
                    placeholder={"E-mail"}
                    value={email}
                    onChange={(e) => onChangeEmail(e.target.value)}
                    style={{ width: "100%" }}
                />
                <Input.Password
                    title={"Password"}
                    type={"password"}
                    placeholder={"Пароль"}
                    value={password}
                    onChange={(e) => onChangePassword(e.target.value)}
                />
                {error && <Alert message={error} type="error" />}
                <Button type={"primary"} onClick={onLogin}>
                    {"Войти"}
                </Button>
                <Button type={"link"}>{"Зарегистрироваться"}</Button>
            </Flex>
        </>
    );
});
