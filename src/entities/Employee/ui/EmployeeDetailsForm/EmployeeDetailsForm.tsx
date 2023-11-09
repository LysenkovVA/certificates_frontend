import { IEmployee } from "@/entities/Employee/model/types/IEmployee";
import { classNames } from "@/shared/lib/classNames/classNames";
import { memo } from "react";
import cls from "./EmployeeDetailsForm.module.scss";

interface EmployeeDetailsFormProps {
    className?: string;
    employee: IEmployee;
}

export const EmployeeDetailsForm = memo((props: EmployeeDetailsFormProps) => {
    const { className, employee } = props;
    return (
        <div className={classNames(cls.EmployeeDetailsForm, {}, [className])}>
            {JSON.stringify(employee)}
        </div>
    );
});
