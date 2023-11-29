import { Berth } from "@/entities/Berth/types/Berth";
import { Department } from "@/entities/Department";
import { getEmployeeDetailsForm } from "@/entities/Employee/model/selectors/getEmployeeDetails/getEmployeeDetails";
import { employeeDetailsActions } from "@/entities/Employee/model/slice/employeeDetailsSlice";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { DatePicker, Flex, Form, Input, Switch, Typography } from "antd";
import dayjs from "dayjs";
import { memo, useCallback, useState } from "react";
import { useSelector } from "react-redux";

interface EmployeeDetailsFormProps {
    className?: string;
}

export const EmployeeDetailsForm = memo((props: EmployeeDetailsFormProps) => {
    const { className } = props;

    const dispatch = useAppDispatch();
    const employeeDetailsForm = useSelector(getEmployeeDetailsForm);

    const [isDismissed, setIsDismissed] = useState<boolean>(
        employeeDetailsForm?.dismissDate !== undefined,
    );

    const onChangeSurname = useCallback(
        (value: string) => {
            dispatch(employeeDetailsActions.setFormSurname(value));
        },
        [dispatch],
    );

    const onChangeName = useCallback(
        (value: string) => {
            dispatch(employeeDetailsActions.setFormName(value));
        },
        [dispatch],
    );

    const onChangeHireDate = useCallback(
        (value: string) => {
            dispatch(employeeDetailsActions.setFormHireDate(value));
        },
        [dispatch],
    );

    const onChangeDismissDate = useCallback(
        (value: string) => {
            dispatch(employeeDetailsActions.setFormDismissDate(value));
        },
        [dispatch],
    );

    const onChangeEmail = useCallback(
        (value: string) => {
            dispatch(employeeDetailsActions.setFormEmail(value));
        },
        [dispatch],
    );

    const onChangePhone = useCallback(
        (value: string) => {
            dispatch(employeeDetailsActions.setFormPhone(value));
        },
        [dispatch],
    );

    const onChangeRank = useCallback(
        (value: string) => {
            dispatch(employeeDetailsActions.setFormRank(value));
        },
        [dispatch],
    );

    const onChangeBerth = useCallback(
        (value: Berth) => {
            dispatch(employeeDetailsActions.setFormBerth(value));
        },
        [dispatch],
    );

    const onChangeDepartment = useCallback(
        (value: Department) => {
            dispatch(employeeDetailsActions.setFormDepartment(value));
        },
        [dispatch],
    );

    return (
        <Form id={"employeeDetailsForm"} layout={"vertical"}>
            <Form.Item
                required
                label={"Фамилия"}
                rules={[{ required: true, message: "Surname is required!" }]}
            >
                <Input
                    value={employeeDetailsForm?.surname}
                    onChange={(e) => onChangeSurname(e.target.value)}
                />
            </Form.Item>
            <Form.Item
                required
                label={"Имя"}
                rules={[{ required: true, message: "Surname is required!" }]}
            >
                <Input
                    value={employeeDetailsForm?.name}
                    onChange={(e) => onChangeName(e.target.value)}
                />
            </Form.Item>
            <Form.Item label={"Принят на работу"}>
                <Flex align={"center"} gap={10}>
                    <DatePicker
                        format={"DD.MM.YYYY"}
                        value={dayjs(employeeDetailsForm?.hireDate)}
                        onChange={(e) =>
                            onChangeHireDate(dayjs(e).format("DD.MM.YYYY"))
                        }
                    />
                    <Flex gap={8}>
                        <Typography.Text>{"Уволен"}</Typography.Text>
                        <Switch
                            checked={isDismissed}
                            onChange={(e) => {
                                setIsDismissed(e);
                                if (e) {
                                    onChangeDismissDate(dayjs().toISOString());
                                }
                            }}
                        />
                    </Flex>
                </Flex>
            </Form.Item>
            <Form.Item label={"Дата увольнения"} hidden={!isDismissed}>
                <DatePicker
                    disabled={isDismissed}
                    format={"DD.MM.YYYY"}
                    value={
                        isDismissed
                            ? dayjs(employeeDetailsForm?.dismissDate)
                            : undefined
                    }
                    onChange={(e) =>
                        onChangeDismissDate(dayjs(e).format("DD.MM.YYYY"))
                    }
                />
            </Form.Item>
            <Form.Item label={"E-mail"}>
                <Input
                    inputMode={"email"}
                    value={employeeDetailsForm?.email}
                    onChange={(e) => onChangeEmail(e.target.value)}
                />
            </Form.Item>
            <Form.Item label={"Телефон"}>
                <Input
                    inputMode={"tel"}
                    value={employeeDetailsForm?.phone}
                    onChange={(e) => onChangePhone(e.target.value)}
                />
            </Form.Item>
        </Form>
    );
});
