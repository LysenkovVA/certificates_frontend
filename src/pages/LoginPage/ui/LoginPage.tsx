import { AppDispatch } from "@/app/providers/StoreProvider";
import { getAuthenticatedUser } from "@/entities/User/model/selectors/getAuthenticatedUser/getAuthenticatedUser";
import { authActions, authByEmail, getAuth } from "@/features/auth";
import logo from "@/shared/assets/logo/crane.png";
import { classNames } from "@/shared/lib/classNames/classNames";
import { AppImage } from "@/shared/ui/AppImage";
import { Button } from "@/shared/ui/Button";
import { HStack, VStack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { TextBox } from "@/shared/ui/TextBox";
import { memo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import cls from "./LoginPage.module.scss";

interface LoginPageProps {
    className?: string;
}

const LoginPage = (props: LoginPageProps) => {
    const { className } = props;

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
        <div className={classNames(cls.LoginPage, {}, [className])}>
            <VStack gap={"8"} align={"center"}>
                <AppImage src={logo} width={100} height={100} />
                <TextBox
                    placeholder={"E-mail"}
                    onChange={onChangeEmail}
                    value={email}
                />
                <TextBox
                    placeholder={"Пароль"}
                    type={"password"}
                    onChange={onChangePassword}
                    value={password}
                />
                {error && (
                    <Text colorStyle={"critic"} size={"s"} text={error} />
                )}
                <HStack justify={"center"}>
                    <Button
                        colorStyle={"success"}
                        variant={"outline"}
                        onClick={onLogin}
                        disabled={isLoading}
                    >
                        {"Войти"}
                    </Button>
                </HStack>
            </VStack>
        </div>
    );
};

export default memo(LoginPage);
