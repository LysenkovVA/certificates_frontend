import { Profile } from "@/entities/Profile/model/types/Profile";
import calendarSvg from "@/shared/assets/svg/dateField.svg";
import { classNames } from "@/shared/lib/classNames/classNames";
import { PreviewField } from "@/shared/ui/PreviewField";
import { Avatar, Typography } from "antd";
import dayjs from "dayjs";
import { memo } from "react";
import cls from "./ProfileCardView.module.scss";

interface ProfileCardViewProps {
    className?: string;
    avatar: string;
    profileData?: Profile;
}

export const ProfileCardView = memo((props: ProfileCardViewProps) => {
    const { className, profileData, avatar } = props;

    return (
        <>
            <div className={cls.avatar}>
                <Avatar size={100} src={avatar} />
            </div>

            <Typography.Text
                className={classNames(cls.surname)}
                type={!profileData?.surname ? "secondary" : undefined}
            >
                {profileData?.surname || "Фамилия"}
            </Typography.Text>
            <Typography.Text
                className={cls.name}
                type={!profileData?.name ? "secondary" : undefined}
            >
                {profileData?.name || "Имя и отчество"}
            </Typography.Text>
            <PreviewField
                component={calendarSvg}
                value={dayjs(profileData?.birthDate).format("DD.MM.YYYY")}
            />
        </>
    );
});
