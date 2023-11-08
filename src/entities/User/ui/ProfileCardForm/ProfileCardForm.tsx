import { IUser } from "@/entities/User/model/types/IUser";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Avatar, DatePicker, Form, Input } from "antd";
import dayjs from "dayjs";
import { memo } from "react";
import cls from "./ProfileCardForm.module.scss";

interface ProfileCardFormProps {
    className?: string;
    profileData?: IUser;
    onChangeSurname?: (value: string) => void;
    onChangeName?: (value: string) => void;
    onChangeBirthDate?: (value: string | undefined) => void;
}

export const ProfileCardForm = memo((props: ProfileCardFormProps) => {
    const {
        className,
        profileData,
        onChangeSurname,
        onChangeName,
        onChangeBirthDate,
    } = props;
    return (
        <Form layout={"horizontal"} style={{ width: "100%" }} labelWrap>
            <Form.Item>
                <Avatar
                    size={150}
                    className={classNames(cls.avatar, {}, [className])}
                />
            </Form.Item>
            <Form.Item label={"Фамилия:"} labelCol={{ span: 4 }}>
                <Input
                    placeholder={"Укажите фамилию"}
                    value={profileData?.surname}
                    onChange={(e) => onChangeSurname?.(e.target.value)}
                />
            </Form.Item>
            <Form.Item label={"Имя и отчество:"} labelCol={{ span: 4 }}>
                <Input
                    placeholder={"Укажите имя и отчество"}
                    value={profileData?.name}
                    onChange={(e) => onChangeName?.(e.target.value)}
                />
            </Form.Item>
            <Form.Item label={"Дата рождения:"} labelCol={{ span: 4 }}>
                <DatePicker
                    placeholder={"Укажите ДР"}
                    style={{ width: "100%" }}
                    format={"DD.MM.YYYY"}
                    value={dayjs(profileData?.birthDate)}
                    onChange={(e) =>
                        onChangeBirthDate?.(e?.toDate().toDateString())
                    }
                />
            </Form.Item>
        </Form>
    );
});
