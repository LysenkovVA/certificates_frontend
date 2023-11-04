import { UserOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";
import { IEmployee } from "../../model/types/IEmployee";

interface EmployeeCardProps {
    className?: string;
    employee: IEmployee;
}

export const EmployeeCard = (props: EmployeeCardProps) => {
    const { className, employee } = props;

    return (
        <Card>
            <Avatar icon={<UserOutlined />} />
            <div>{employee.surname}</div>
            <div>{employee.name}</div>
        </Card>
    );
};

export default EmployeeCard;
