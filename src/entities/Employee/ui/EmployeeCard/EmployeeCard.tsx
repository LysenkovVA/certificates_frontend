import { UserOutlined } from "@ant-design/icons";
import { Avatar, Card, Flex } from "antd";
import { IEmployee } from "../../model/types/IEmployee";

interface EmployeeCardProps {
    className?: string;
    employee: IEmployee;
}

export const EmployeeCard = (props: EmployeeCardProps) => {
    const { className, employee } = props;

    return (
        <Card hoverable style={{ width: 150 }}>
            <Flex vertical align={"center"}>
                <Avatar icon={<UserOutlined />} />
                <div>{employee.surname}</div>
                <div>{employee.name}</div>
            </Flex>
        </Card>
    );
};

export default EmployeeCard;
