import { getAuthenticatedUser } from "@/entities/User";
import { userActions } from "@/entities/User/model/slice/userSlice";
import { RoutePath } from "@/shared/config/routeConfig/routeConfig";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { classNames } from "@/shared/lib/classNames/classNames";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Popover, Space } from "antd";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import cls from "./HeaderAvatar.module.scss";

export interface HeaderAvatarProps {
    className?: string;
}

export const HeaderAvatar = (props: HeaderAvatarProps) => {
    const { className } = props;

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useSelector(getAuthenticatedUser);

    const [isOpen, setIsOpen] = useState(false);

    const showMenu = useCallback(
        (open: boolean) => {
            setIsOpen(open);
        },
        [open, setIsOpen],
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
            title={user.email}
            content={content}
            open={isOpen}
            onOpenChange={showMenu}
            placement={"bottomLeft"}
        >
            <div className={classNames(cls.HeaderAvatar, {}, [className])}>
                <Avatar icon={!user.avatar && <UserOutlined />} />
                {user.email}
            </div>
        </Popover>
    );
};
