import { Berth } from "@/entities/Berth/types/Berth";
import { Department } from "@/entities/Department";
import { BerthSelector } from "@/features/Berthes/berthSelector/ui/BerthSelector/BerthSelector";
import { DepartmentSelector } from "@/features/Departments/departmentSelector";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { EditableAvatar } from "@/shared/ui/EditableAvatar/EditableAvatar";
import {
    Alert,
    Button,
    Col,
    DatePicker,
    Divider,
    Flex,
    Form,
    Input,
    Row,
} from "antd";
import dayjs from "dayjs";
import { memo, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import {
    getEmployeeDetailsDataError,
    getEmployeeDetailsForm,
} from "../../model/selectors/getEmployeeDetails/getEmployeeDetails";
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
    onSave?: () => void;
    onCancel?: () => void;
}

export const EmployeeDetailsForm = memo((props: EmployeeDetailsFormProps) => {
    const { onSave, onCancel } = props;

    const dispatch = useAppDispatch();
    const employeeDetailsForm = useSelector(getEmployeeDetailsForm);
    const error = useSelector(getEmployeeDetailsDataError);

    const fields = useMemo((): FieldData[] => {
        return [
            { name: ["surname"], value: employeeDetailsForm?.surname ?? "" },
            { name: ["name"], value: employeeDetailsForm?.name ?? "" },
            {
                name: ["hireDate"],
                value: employeeDetailsForm?.hireDate
                    ? dayjs(employeeDetailsForm?.hireDate, [
                          "DD.MM.YYYY",
                          "YYYY-MM-DD",
                      ])
                    : dayjs(new Date()),
            },
            {
                name: ["dismissDate"],
                value:
                    dayjs(employeeDetailsForm?.dismissDate, "DD.MM.YYYY") ??
                    undefined,
            },
            { name: ["email"], value: employeeDetailsForm?.email ?? "" },
            { name: ["phone"], value: employeeDetailsForm?.phone ?? "" },
            { name: ["rank"], value: employeeDetailsForm?.rank ?? "" },
        ];
    }, [employeeDetailsForm]);

    const onValueChanged = useCallback(
        async (changedValues: any) => {
            const keys: string[] = Object.keys(changedValues);

            keys.forEach((key) => {
                switch (key) {
                    case "surname":
                        dispatch(
                            employeeDetailsActions.setEmployeeDetailsFormData({
                                ...employeeDetailsForm,
                                surname: changedValues[key],
                            }),
                        );
                        break;
                    case "name":
                        dispatch(
                            employeeDetailsActions.setEmployeeDetailsFormData({
                                ...employeeDetailsForm,
                                name: changedValues[key],
                            }),
                        );
                        break;
                    case "hireDate":
                        dispatch(
                            employeeDetailsActions.setEmployeeDetailsFormData({
                                ...employeeDetailsForm,
                                hireDate: changedValues[key],
                            }),
                        );
                        break;
                    case "dismissDate":
                        dispatch(
                            employeeDetailsActions.setEmployeeDetailsFormData({
                                ...employeeDetailsForm,
                                dismissDate: changedValues[key],
                            }),
                        );
                        break;
                    case "email":
                        dispatch(
                            employeeDetailsActions.setEmployeeDetailsFormData({
                                ...employeeDetailsForm,
                                email: changedValues[key],
                            }),
                        );
                        break;
                    case "phone":
                        dispatch(
                            employeeDetailsActions.setEmployeeDetailsFormData({
                                ...employeeDetailsForm,
                                phone: changedValues[key],
                            }),
                        );
                        break;
                    case "rank":
                        dispatch(
                            employeeDetailsActions.setEmployeeDetailsFormData({
                                ...employeeDetailsForm,
                                rank: changedValues[key],
                            }),
                        );
                        break;
                }
            });
        },
        [dispatch, employeeDetailsForm],
    );

    const onChangeAvatar = useCallback(
        (value: string) => {
            dispatch(
                employeeDetailsActions.setEmployeeDetailsFormDataAvatar(value),
            );
        },
        [dispatch],
    );

    const onDeleteAvatar = useCallback(() => {
        dispatch(employeeDetailsActions.setRemoveAvatarOnUpdate(true));
    }, [dispatch]);

    const onChangeBerth = useCallback(
        (value: Berth | undefined) => {
            dispatch(
                employeeDetailsActions.setEmployeeDetailsFormData({
                    ...employeeDetailsForm,
                    berth: value,
                }),
            );
        },
        [dispatch, employeeDetailsForm],
    );

    const onChangeDepartment = useCallback(
        (value: Department | undefined) => {
            dispatch(
                employeeDetailsActions.setEmployeeDetailsFormData({
                    ...employeeDetailsForm,
                    department: value,
                }),
            );
        },
        [dispatch, employeeDetailsForm],
    );

    return (
        <>
            <Form
                id={"employeeDetailsForm"}
                layout={"vertical"}
                fields={fields}
                onValuesChange={onValueChanged}
                onFinish={onSave}
                // onReset={onCancel}
            >
                {error && (
                    <Form.Item>
                        <Alert message={error} type="error" showIcon />{" "}
                    </Form.Item>
                )}
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
                                    message:
                                        "Пожалуйста, укажите имя и отчество!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Flex justify={"flex-end"}>
                            <EditableAvatar
                                size={150}
                                style={{ backgroundColor: "#87d068" }}
                                file={employeeDetailsForm?.avatar}
                                onChangeAvatar={onChangeAvatar}
                                onDeleteAvatar={onDeleteAvatar}
                            />
                        </Flex>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={8}>
                        <Form.Item
                            label={"Телефон"}
                            name={"phone"}
                            rules={[
                                {
                                    message: "Телефон указан неверно",
                                },
                            ]}
                        >
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
                <Divider />
                <Row gutter={[8, 8]}>
                    <Col>
                        <Form.Item>
                            <Button type={"primary"} htmlType={"submit"}>
                                {"Сохранить"}
                            </Button>
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item>
                            <Button onClick={onCancel}>{"Отмена"}</Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
});
