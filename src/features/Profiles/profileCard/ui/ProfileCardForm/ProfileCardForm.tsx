import { Profile } from "@/entities/Profile/model/types/Profile";
import { EditableAvatar } from "@/shared/ui/EditableAvatar/EditableAvatar";
import { DatePicker, Form, Input } from "antd";
import dayjs from "dayjs";
import { memo } from "react";
import cls from "./ProfileCardForm.module.scss";

interface ProfileCardFormProps {
    className?: string;
    profileData?: Profile;
    avatar?: string | undefined;
    onChangeSurname?: (value: string) => void;
    onChangeName?: (value: string) => void;
    onChangeBirthDate?: (value: string | undefined) => void;
    onChangeAvatar?: (value: string) => void;
}

export const ProfileCardForm = memo((props: ProfileCardFormProps) => {
    //const isInitialized = useSelector(getProfileDataInitialized);

    const {
        className,
        profileData,
        avatar,
        onChangeSurname,
        onChangeName,
        onChangeBirthDate,
        onChangeAvatar,
    } = props;

    return (
        <Form
            id={"profileCardForm"}
            layout={"horizontal"}
            style={{ width: "100%" }}
            labelWrap
        >
            <Form.Item className={cls.avatar}>
                <EditableAvatar
                    avatar={avatar}
                    onChangeAvatar={onChangeAvatar}
                    style={{ width: 150, height: 150 }}
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
