import { UserOutlined } from "@ant-design/icons";
import { Avatar, Card, Flex } from "antd";
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
            style={{ width: 150, marginRight: 10, marginBottom: 10 }}
            onClick={(e) => onClick?.(employee?.id)}
        >
            <Flex vertical align={"center"}>
                <Avatar icon={<UserOutlined />} />
                <div>{employee.surname}</div>
                <div>{employee.name}</div>
            </Flex>
        </Card>
    );
};

export default EmployeeCard;
