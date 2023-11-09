import { IEmployee } from "@/entities/Employee/model/types/IEmployee";
import { classNames } from "@/shared/lib/classNames/classNames";
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
            {JSON.stringify(employee)}
        </div>
    );
});
