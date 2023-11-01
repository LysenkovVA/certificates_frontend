import { AppDispatch } from "@/app/providers/StoreProvider";
import { getAuthenticatedUser } from "@/entities/User";
import { userActions } from "@/entities/User/model/slice/userSlice";
import { classNames } from "@/shared/lib/classNames/classNames";
import { CloseOutlined, SaveOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, DatePicker, Flex, Form, Input } from "antd";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cls from "./UserCard.module.scss";

interface UserCardProps {
    className?: string;
    readonly?: boolean;
}

export const UserCard = (props: UserCardProps) => {
    const { className, readonly } = props;

    const dispatch = useDispatch<AppDispatch>();

    const { surname, name, patronymic, birthDate, avatar } =
        useSelector(getAuthenticatedUser);

    const [newSurname, setNewSurname] = useState(surname);
    const [newName, setNewName] = useState(name);
    const [newPatronymic, setNewPatronymic] = useState(patronymic);

    const onChangeSurname = useCallback(
        (value: string) => {
            setNewSurname(value);
        },
        [setNewSurname],
    );

    const onLogOut = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    const onSave = useCallback(() => {
        dispatch(userActions.setAuthDataSurname(surname));

        // TODO: Запрос на бекэнд!
    }, [dispatch, surname]);

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
            <Flex align={"center"} justify={"center"} gap={"small"}>
                <Button
                    type={"default"}
                    icon={<SaveOutlined />}
                    onClick={onSave}
                >
                    {"Сохранить"}
                </Button>
                <Button type={"default"} icon={<CloseOutlined />} danger>
                    {"Отмена"}
                </Button>
            </Flex>
            <Button onClick={onLogOut}>{"Logout"}</Button>
        </Card>
    );
};
