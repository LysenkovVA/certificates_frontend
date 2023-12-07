import { getAuthenticatedUser } from "@/entities/User";
import {
    getUserAvatar,
    getUserAvatarIsInited,
    getUserIsInited,
} from "@/entities/User/model/selectors/getUserIsInited/getAuthenticatedUserId";
import { fetchUserAvatar } from "@/entities/User/model/services/fetchUserAvatar/fetchUserAvatar";
import { profileReducer } from "@/features/Profiles/profileCard/model/slice/profileSlice";
import { authLogout } from "@/features/logout/model/services/logout/authLogout";
import { logoutReducer } from "@/features/logout/model/slice/logoutSlice";
import { RoutePath } from "@/shared/config/routeConfig/routeConfig";
import { classNames } from "@/shared/lib/classNames/classNames";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Flex, Popover, Space, Typography } from "antd";
import { memo, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import cls from "./HeaderAvatar.module.scss";

export interface HeaderAvatarProps {
    className?: string;
}

const reducers: ReducersList = {
    logoutSchema: logoutReducer,
    profileSchema: profileReducer,
};

export const HeaderAvatar = memo((props: HeaderAvatarProps) => {
    const { className } = props;

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useSelector(getAuthenticatedUser);
    const isUserInitialized = useSelector(getUserIsInited);
    const isUserAvatarIsInitialized = useSelector(getUserAvatarIsInited);
    const userAvatar = useSelector(getUserAvatar);

    console.log("Header avatar inited: " + isUserAvatarIsInitialized);

    useEffect(() => {
        if (isUserInitialized && !isUserAvatarIsInitialized) {
            console.log("fetching user avatar...");
            dispatch(fetchUserAvatar({ fileId: user.profile?.avatar?.id }));
        }
    }, [
        dispatch,
        isUserAvatarIsInitialized,
        isUserInitialized,
        user.profile?.avatar,
        user.profile?.avatar?.id,
    ]);

    const [isOpen, setIsOpen] = useState(false);

    const showMenu = useCallback(
        (open: boolean) => {
            setIsOpen(open);
        },
        [setIsOpen],
    );

    const onProfileClick = useCallback(() => {
        navigate(RoutePath.profile + user.profile?.id);
    }, [navigate, user.profile?.id]);

    const onLogout = useCallback(() => {
        dispatch(authLogout());
        // navigate(RoutePath.login); <-- это не отрабатывало
    }, [dispatch]);

    const content = (
        <div>
            <Space direction={"vertical"}>
                <a onClick={() => onProfileClick()}>Профиль</a>
                <a onClick={() => onLogout()}>Выход</a>
            </Space>
        </div>
    );

    return (
        // TODO Редюсер демонтируется до fulfilled
        <DynamicModuleLoader reducers={reducers}>
            <Popover
                // title={user?.email}
                content={content}
                open={isOpen}
                onOpenChange={showMenu}
                placement={"bottomLeft"}
            >
                <div className={classNames(cls.HeaderAvatar, {}, [className])}>
                    <Flex vertical justify={"center"} align={"center"}>
                        <Avatar icon={<UserOutlined />} src={userAvatar} />
                        <Typography.Text keyboard type={"secondary"}>
                            {user.profile?.name ?? user.email}
                        </Typography.Text>
                    </Flex>
                </div>
            </Popover>
        </DynamicModuleLoader>
    );
});
