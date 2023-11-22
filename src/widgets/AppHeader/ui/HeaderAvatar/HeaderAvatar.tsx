import { getAuthenticatedUser } from "@/entities/User";
import { userActions } from "@/entities/User/model/slice/userSlice";
import { RoutePath } from "@/shared/config/routeConfig/routeConfig";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Flex, Popover, Space, Typography } from "antd";
import { memo, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import cls from "./HeaderAvatar.module.scss";

export interface HeaderAvatarProps {
    className?: string;
}

export const HeaderAvatar = memo((props: HeaderAvatarProps) => {
    const { className } = props;

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useSelector(getAuthenticatedUser);

    const [isOpen, setIsOpen] = useState(false);

    const showMenu = useCallback(
        (open: boolean) => {
            setIsOpen(open);
        },
        [setIsOpen],
    );

    const onProfileClick = useCallback(() => {
        navigate(RoutePath.profile);
    }, [navigate]);

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
        navigate(RoutePath.login);
    }, [dispatch, navigate]);

    const content = (
        <div>
            <Space direction={"vertical"}>
                <a onClick={() => onProfileClick()}>Профиль</a>
                <a onClick={() => onLogout()}>Выход</a>
            </Space>
        </div>
    );

    return (
        <Popover
            // title={user?.email}
            content={content}
            open={isOpen}
            onOpenChange={showMenu}
            placement={"bottomLeft"}
        >
            <div className={classNames(cls.HeaderAvatar, {}, [className])}>
                <Flex vertical justify={"center"} align={"center"}>
                    <Avatar
                        icon={!user.profile?.avatar && <UserOutlined />}
                        // src={`${__API__}${user.profile?.avatar}`}
                    />
                    <Typography.Text keyboard type={"secondary"}>
                        {user.email}
                    </Typography.Text>
                </Flex>
            </div>
        </Popover>
    );
});
