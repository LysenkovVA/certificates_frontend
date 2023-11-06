import { getAuthenticatedUser } from "@/entities/User";
import { userActions } from "@/entities/User/model/slice/userSlice";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { classNames } from "@/shared/lib/classNames/classNames";
import { SaveCancelButtons } from "@/shared/ui/SaveCancelButtons/SaveCancelButtons";
import { Avatar, Card, DatePicker, Form, Input } from "antd";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import cls from "./UserCard.module.scss";

interface UserCardProps {
    className?: string;
    readonly?: boolean;
}

export const UserCard = (props: UserCardProps) => {
    const { className, readonly } = props;

    // const dispatch = useDispatch<AppDispatch>();
    const dispatch = useAppDispatch();

    const user = useSelector(getAuthenticatedUser);

    const [newSurname, setNewSurname] = useState(user?.surname);
    const [newName, setNewName] = useState(user?.name);
    const [newPatronymic, setNewPatronymic] = useState(user?.patronymic);

    const onChangeSurname = useCallback(
        (value: string) => {
            setNewSurname(value);
        },
        [setNewSurname],
    );

    const onSave = useCallback(() => {
        dispatch(userActions.setAuthDataSurname(newSurname || ""));

        // TODO: Запрос на бекэнд!
    }, [dispatch, newSurname]);

    return (
        <Card
            title={"Профиль пользователя"}
            className={classNames(cls.UserCard, {}, [className])}
        >
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
                        value={newSurname}
                        onChange={(e) => onChangeSurname(e.target.value)}
                    />
                </Form.Item>
                <Form.Item label={"Имя:"} labelCol={{ span: 4 }}>
                    <Input placeholder={"Укажите имя"} />
                </Form.Item>
                <Form.Item label={"Отчество:"} labelCol={{ span: 4 }}>
                    <Input placeholder={"Укажите отчество"} />
                </Form.Item>
                <Form.Item label={"Дата рождения:"} labelCol={{ span: 4 }}>
                    <DatePicker
                        placeholder={"Укажите ДР"}
                        style={{ width: "100%" }}
                    />
                </Form.Item>
            </Form>
            <SaveCancelButtons onSaveClick={onSave} />
        </Card>
    );
};
