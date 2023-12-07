import { Berth } from "@/entities/Berth/types/Berth";
import { Department } from "@/entities/Department";
import { BerthSelector } from "@/features/Berthes/berthSelector/ui/BerthSelector/BerthSelector";
import { DepartmentSelector } from "@/features/Departments/departmentSelector";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { EditableAvatar } from "@/shared/ui/EditableAvatar/EditableAvatar";
import { Col, DatePicker, Divider, Form, Input, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import { memo, useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getEmployeeDetailsForm } from "../../model/selectors/getEmployeeDetails/getEmployeeDetails";
import { employeeDetailsActions } from "../../model/slice/employeeDetailsSlice";

interface FieldData {
    name: string | number | Array<string | number>;
    value?: any;
    touched?: boolean;
    validating?: boolean;
    errors?: string[];
}

interface EmployeeDetailsFormProps {
    className?: string;
    avatar: string;
    onChangeAvatar: (value: string | undefined) => void;
}

export const EmployeeDetailsForm = memo((props: EmployeeDetailsFormProps) => {
    const { className, avatar, onChangeAvatar } = props;

    const [form] = useForm();

    const dispatch = useAppDispatch();
    const employeeDetailsForm = useSelector(getEmployeeDetailsForm);

    const fields = useMemo((): FieldData[] => {
        return [
            { name: ["surname"], value: employeeDetailsForm?.surname },
            { name: ["name"], value: employeeDetailsForm?.name },
            {
                name: ["hireDate"],
                value:
                    dayjs(employeeDetailsForm?.hireDate, [
                        "DD.MM.YYYY",
                        "YYYY-MM-DD",
                    ]) ?? undefined,
            },
            {
                name: ["dismissDate"],
                value:
                    dayjs(employeeDetailsForm?.dismissDate, "DD.MM.YYYY") ??
                    undefined,
            },
            { name: ["email"], value: employeeDetailsForm?.email },
            { name: ["phone"], value: employeeDetailsForm?.phone },
            { name: ["rank"], value: employeeDetailsForm?.rank },
        ];
    }, [employeeDetailsForm]);

    const onValueChanged = useCallback(
        async (changedValues: any) => {
            const keys: string[] = Object.keys(changedValues);

            keys.forEach((key) => {
                switch (key) {
                    case "surname":
                        dispatch(
                            employeeDetailsActions.setFormSurname(
                                changedValues[key],
                            ),
                        );
                        break;
                    case "name":
                        dispatch(
                            employeeDetailsActions.setFormName(
                                changedValues[key],
                            ),
                        );
                        break;
                    case "hireDate":
                        dispatch(
                            employeeDetailsActions.setFormHireDate(
                                changedValues[key],
                            ),
                        );
                        break;
                    case "dismissDate":
                        dispatch(
                            employeeDetailsActions.setFormHireDate(
                                changedValues[key],
                            ),
                        );
                        break;
                    case "email":
                        dispatch(
                            employeeDetailsActions.setFormEmail(
                                changedValues[key],
                            ),
                        );
                        break;
                    case "phone":
                        dispatch(
                            employeeDetailsActions.setFormPhone(
                                changedValues[key],
                            ),
                        );
                        break;
                    case "rank":
                        dispatch(
                            employeeDetailsActions.setFormRank(
                                changedValues[key],
                            ),
                        );
                        break;
                }
            });

            // await form.validateFields();
        },
        [dispatch],
    );

    const [isDismissed, setIsDismissed] = useState<boolean>(
        employeeDetailsForm?.dismissDate !== undefined,
    );

    const onChangeDismissDate = useCallback(
        (value: string) => {
            dispatch(employeeDetailsActions.setFormDismissDate(value));
        },
        [dispatch],
    );

    const onChangeBerth = useCallback(
        (value: Berth | undefined) => {
            dispatch(employeeDetailsActions.setFormBerth(value));
        },
        [dispatch],
    );

    const onChangeDepartment = useCallback(
        (value: Department | undefined) => {
            dispatch(employeeDetailsActions.setFormDepartment(value));
        },
        [dispatch],
    );

    const onChangeAvatarForm = useCallback(
        (value: string | undefined) => {
            dispatch(employeeDetailsActions.setFormAvatar(value));
            onChangeAvatar(value);
        },
        [dispatch, onChangeAvatar],
    );

    return (
        <Form
            id={"employeeDetailsForm"}
            layout={"vertical"}
            fields={fields}
            onValuesChange={onValueChanged}
        >
            <Row gutter={[8, 8]}>
                <Col span={12}>
                    <Form.Item
                        required
                        name={"surname"}
                        label={"Фамилия"}
                        rules={[
                            {
                                required: true,
                                message: "Пожалуйста, укажите фамилию!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        required
                        label={"Имя и отчество"}
                        name={"name"}
                        rules={[
                            {
                                required: true,
                                message: "Пожалуйста, укажите имя и отчество!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <EditableAvatar
                        size={150}
                        style={{ backgroundColor: "#87d068" }}
                        avatar={avatar}
                        onChangeAvatar={onChangeAvatarForm}
                    />
                </Col>
            </Row>
            <Row gutter={[8, 8]}>
                <Col span={8}>
                    <Form.Item label={"Телефон"} name={"phone"}>
                        <Input inputMode={"tel"} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[8, 8]}>
                <Col span={8}>
                    <Form.Item
                        label={"E-mail"}
                        name={"email"}
                        rules={[
                            {
                                required: false,
                                type: "email",
                                message:
                                    "Пожалуйста, укажите корректный E-mail!",
                            },
                        ]}
                    >
                        <Input inputMode={"email"} />
                    </Form.Item>
                </Col>
            </Row>
            <Divider orientation={"left"} orientationMargin={0}>
                Работа
            </Divider>
            <Row gutter={[8, 8]}>
                <Col span={8}>
                    <Form.Item label={"Должность"}>
                        <BerthSelector
                            value={employeeDetailsForm?.berth}
                            onValueChanged={onChangeBerth}
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label={"Участок"}>
                        <DepartmentSelector
                            value={employeeDetailsForm?.department}
                            onValueChanged={onChangeDepartment}
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label={"Разряд"} name={"rank"}>
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item label={"Принят на работу"} name={"hireDate"}>
                <DatePicker format={"DD.MM.YYYY"} />
            </Form.Item>
        </Form>
    );
});
