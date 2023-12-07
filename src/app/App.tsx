import { getAuthenticatedUser } from "@/entities/User";
import { getUserIsInited } from "@/entities/User/model/selectors/getUserIsInited/getAuthenticatedUserId";
import { initAuthData } from "@/entities/User/model/services/initAuthData/initAuthData";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { AppFooter } from "@/widgets/AppFooter";
import { AppHeader } from "@/widgets/AppHeader";
import { AppSideMenu } from "@/widgets/AppSideMenu";
import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import cls from "./App.modules.scss";
import { AppRouter } from "./providers/router";
import "./styles/index.scss";

export const App = () => {
    const dispatch = useAppDispatch();
    const authenticatedUser = useSelector(getAuthenticatedUser);
    const userIsInited = useSelector(getUserIsInited);

    // Загружаем информацию об авторизованном пользователе
    useEffect(() => {
        if (!userIsInited) {
            dispatch(initAuthData());
        }
    }, [dispatch, userIsInited]);

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
                    <Sider
                        theme={"light"}
                        // style={{
                        //     overflow: "auto",
                        //     height: "100vh",
                        //     position: "fixed",
                        //     left: 0,
                        //     top: 0,
                        //     bottom: 0,
                        // }}
                    >
                        <AppSideMenu />
                    </Sider>
                    <Content
                        className={classNames(cls.content)}
                        style={
                            {
                                //overflow: "initial",
                                // height: "100vh",
                                //overflowY: "auto",
                            }
                        }
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
