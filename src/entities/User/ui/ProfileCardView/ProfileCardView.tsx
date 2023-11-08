import { IUser } from "@/entities/User/model/types/IUser";
import { classNames } from "@/shared/lib/classNames/classNames";
import { CalendarOutlined, MailOutlined } from "@ant-design/icons";
import { Avatar, Typography } from "antd";
import { memo } from "react";
import cls from "./ProfileCardView.module.scss";

interface ProfileCardViewProps {
    className?: string;
    profileData?: IUser;
}

export const ProfileCardView = memo((props: ProfileCardViewProps) => {
    const { className, profileData } = props;

    return (
        <>
            <div className={cls.avatar}>
                <Avatar size={100} />
            </div>

            <Typography.Title
                className={classNames(cls.surname)}
                level={2}
                type={!profileData?.surname ? "secondary" : undefined}
            >
                {profileData?.surname || "Фамилия"}
            </Typography.Title>
            <Typography.Text
                className={cls.name}
                type={!profileData?.name ? "secondary" : undefined}
            >
                {profileData?.name || "Имя и отчество"}
            </Typography.Text>
            <div>
                <MailOutlined />
                <Typography.Text
                    type={!profileData?.email ? "secondary" : undefined}
                >
                    {profileData?.email || "Электронная почта"}
                </Typography.Text>
            </div>
            <div>
                <CalendarOutlined />
                <Typography.Text
                    type={!profileData?.birthDate ? "secondary" : undefined}
                >
                    {profileData?.birthDate || "Дата рождения"}
                </Typography.Text>
            </div>
        </>
    );
});
