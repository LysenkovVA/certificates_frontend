import berthSvg from "@/shared/assets/svg/berth.svg";
import departmentSvg from "@/shared/assets/svg/department.svg";
import organizationSvg from "@/shared/assets/svg/organization.svg";
import { classNames } from "@/shared/lib/classNames/classNames";
import { PreviewField } from "@/shared/ui/PreviewField";
import { Card, Flex, Image, Typography } from "antd";
import { IEmployee } from "../../model/types/IEmployee";
import cls from "./EmployeeCard.module.scss";

interface EmployeeCardProps {
    className?: string;
    employee: IEmployee;
    onClick?: (id: string | undefined) => void;
}

export const EmployeeCard = (props: EmployeeCardProps) => {
    const { className, employee, onClick } = props;

    return (
        <Card
            className={classNames(cls.EmployeeCard, {}, [className])}
            hoverable
            bodyStyle={{ padding: 10, overflow: "hidden" }}
            onClick={(e) => onClick?.(employee?.id)}
        >
            <Flex vertical>
                <Flex>
                    <Image rootClassName={cls.photo} preview={false} />
                    <Flex vertical align={"flex-start"}>
                        <Typography.Text className={cls.surname}>
                            {employee.surname}
                        </Typography.Text>
                        <Typography.Text>{employee.name}</Typography.Text>
                    </Flex>
                </Flex>
                <PreviewField
                    component={berthSvg}
                    value={employee.berth?.value}
                />
                <PreviewField
                    component={departmentSvg}
                    value={employee.department?.name}
                />
                <PreviewField
                    component={organizationSvg}
                    value={employee.department?.organization?.name}
                />
            </Flex>
        </Card>
    );
};

export default EmployeeCard;
