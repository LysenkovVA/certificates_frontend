import { classNames } from "@/shared/lib/classNames/classNames";
import { memo } from "react";
import cls from "./EmployeesPage.module.scss";

interface EmployeesPageProps {
    className?: string;
}

const EmployeesPage = (props: EmployeesPageProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.CertificatesPage, {}, [className])}>
            {"Employees page"}
        </div>
    );
};

export default memo(EmployeesPage);
