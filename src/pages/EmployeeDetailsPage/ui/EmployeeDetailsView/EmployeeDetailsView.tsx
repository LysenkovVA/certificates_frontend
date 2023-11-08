import { classNames } from "@/shared/lib/classNames/classNames";
import { memo } from "react";
import cls from "./EmployeeDetailsView.module.scss";

interface EmployeeDetailsViewProps {
    className?: string;
}

export const EmployeeDetailsView = memo((props: EmployeeDetailsViewProps) => {
    const { className } = props;
    return (
        <div className={classNames(cls.EmployeeDetailsView, {}, [className])}>
            {"Employee details view"}
        </div>
    );
});
