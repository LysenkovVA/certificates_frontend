import { IEmployee } from "@/entities/Employee/model/types/IEmployee";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Avatar, Flex, Typography } from "antd";
import { memo } from "react";
import cls from "./EmployeeDetailsView.module.scss";

interface EmployeeDetailsViewProps {
    className?: string;
    employee: IEmployee;
}

export const EmployeeDetailsView = memo((props: EmployeeDetailsViewProps) => {
    const { className, employee } = props;
    return (
        <div className={classNames(cls.EmployeeDetailsView, {}, [className])}>
            <Flex vertical>
                <Flex gap={"large"}>
                    <Avatar
                        shape={"square"}
                        style={{ width: 100, height: 100 }}
                    />
                    <Flex vertical>
                        <Typography.Text>{employee.surname}</Typography.Text>
                        <Typography.Text>{employee.name}</Typography.Text>
                    </Flex>
                </Flex>
            </Flex>
        </div>
    );
});
