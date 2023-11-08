import { classNames } from "@/shared/lib/classNames/classNames";
import { memo } from "react";
import cls from "./EmployeeDetailsForm.module.scss";

interface EmployeeDetailsFormProps {
    className?: string;
}

export const EmployeeDetailsForm = memo((props: EmployeeDetailsFormProps) => {
    const { className } = props;
    return (
        <div className={classNames(cls.EmployeeDetailsForm, {}, [className])}>
            {"Employee Details Form"}
        </div>
    );
});
