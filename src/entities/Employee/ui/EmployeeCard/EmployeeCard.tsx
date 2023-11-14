import berthSvg from "@/shared/assets/svg/berth.svg";
import departmentSvg from "@/shared/assets/svg/department.svg";
import Icon from "@ant-design/icons";
import { Card, Flex, Image } from "antd";
import { IEmployee } from "../../model/types/IEmployee";

interface EmployeeCardProps {
    className?: string;
    employee: IEmployee;
    onClick?: (id: string | undefined) => void;
}

export const EmployeeCard = (props: EmployeeCardProps) => {
    const { className, employee, onClick } = props;

    return (
        <Card
            hoverable
            style={{
                width: 250,
                marginRight: 10,
                marginBottom: 10,
            }}
            bodyStyle={{ padding: 10, overflow: "hidden" }}
            onClick={(e) => onClick?.(employee?.id)}
        >
            <Flex vertical>
                <Flex>
                    <Image
                        preview={false}
                        style={{
                            display: "block",
                            width: 80,
                            height: 80,
                            marginRight: 10,
                        }}
                    />
                    <Flex vertical align={"flex-start"}>
                        <div>{employee.surname}</div>
                        <div>{employee.name}</div>
                    </Flex>
                </Flex>
                <Flex>
                    <Icon
                        component={berthSvg}
                        width={30}
                        height={30}
                        style={{ paddingRight: 5 }}
                    />
                    <div>{employee.berth?.value}</div>
                </Flex>
                <Flex>
                    <Icon
                        component={departmentSvg}
                        width={30}
                        height={30}
                        style={{ paddingRight: 5 }}
                    />
                    <div>{employee.department?.name}</div>
                </Flex>
            </Flex>
        </Card>
    );
};

export default EmployeeCard;
