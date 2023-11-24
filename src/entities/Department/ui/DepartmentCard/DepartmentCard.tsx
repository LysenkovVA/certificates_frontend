import { IDepartment } from "@/entities/Department/model/types/IDepartment";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Card, Typography } from "antd";
import { memo } from "react";
import cls from "./DepartmentCard.module.scss";

interface DepartmentCardProps {
    className?: string;
    department: IDepartment;
}

export const DepartmentCard = memo((props: DepartmentCardProps) => {
    const { className, department } = props;
    return (
        <Card
            className={classNames(cls.DepartmentCard, {}, [className])}
            title={department?.name}
        >
            <Typography.Text>{"Контент"}</Typography.Text>
        </Card>
    );
});
