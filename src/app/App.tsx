import { getAuthenticatedUser } from "@/entities/User";
import { getUserIsInited } from "@/entities/User/model/selectors/getUserIsInited/getAuthenticatedUserId";
import { userActions } from "@/entities/User/model/slice/userSlice";
import { classNames } from "@/shared/lib/classNames/classNames";
import { AppFooter } from "@/widgets/AppFooter";
import { AppHeader } from "@/widgets/AppHeader";
import { AppSideMenu } from "@/widgets/AppSideMenu";
import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import cls from "./App.modules.scss";
import { AppRouter } from "./providers/router";
import "./styles/index.scss";

export const App = () => {
    const dispatch = useDispatch();
    const authenticatedUser = useSelector(getAuthenticatedUser);
    const userIsInited = useSelector(getUserIsInited);

    // Загружаем информацию об авторизованном пользователе
    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    if (authenticatedUser?.id) {
        return (
            <Layout>
                <Header
                    style={{ backgroundColor: "white" }}
                    className={classNames(cls.header, {}, [])}
                >
                    <AppHeader />
                </Header>
                <Layout hasSider>
                    <Sider theme={"light"}>
                        <AppSideMenu />
                    </Sider>
                    <Content
                        className={classNames(cls.content)}
                        style={{
                            height: "100vh",
                            overflowY: "auto",
                        }}
                    >
                        {userIsInited && <AppRouter />}
                    </Content>
                </Layout>
                <Layout>
                    <Footer className={classNames(cls.footer)}>
                        <AppFooter />
                    </Footer>
                </Layout>
            </Layout>
        );
    } else {
        return (
            <div className="content-page">{userIsInited && <AppRouter />}</div>
        );
    }
};
