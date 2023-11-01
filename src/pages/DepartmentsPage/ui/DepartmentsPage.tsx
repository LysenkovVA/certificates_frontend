import { classNames } from "@/shared/lib/classNames/classNames";
import { memo } from "react";
import cls from "./DepartmentsPage.module.scss";

interface DepartmentsPageProps {
    className?: string;
}

const DepartmentsPage = (props: DepartmentsPageProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.DepartmentsPage, {}, [className])}>
            {"Departments page"}
        </div>
    );
};

export default memo(DepartmentsPage);
