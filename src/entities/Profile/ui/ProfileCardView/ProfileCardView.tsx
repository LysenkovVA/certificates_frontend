import { getProfileDataInitialized } from "@/entities/Profile/model/selectors/getProfileData/getProfileData";
import { Profile } from "@/entities/Profile/model/types/Profile";
import { classNames } from "@/shared/lib/classNames/classNames";
import { CalendarOutlined } from "@ant-design/icons";
import { Avatar, Typography } from "antd";
import { memo } from "react";
import { useSelector } from "react-redux";
import cls from "./ProfileCardView.module.scss";

interface ProfileCardViewProps {
    className?: string;
    profileData?: Profile;
}

export const ProfileCardView = memo((props: ProfileCardViewProps) => {
    const { className, profileData } = props;

    const isInitialized = useSelector(getProfileDataInitialized);

    return (
        <>
            <div className={cls.avatar}>
                <Avatar
                    size={100}
                    src={
                        isInitialized
                            ? `${__API__}files/download/${profileData?.id}/avatar`
                            : ""
                    }
                />
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
