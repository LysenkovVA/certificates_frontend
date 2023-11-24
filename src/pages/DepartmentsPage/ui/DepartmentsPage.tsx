import { classNames } from "@/shared/lib/classNames/classNames";
import { Typography } from "antd";
import { memo } from "react";
import cls from "./DepartmentsPage.module.scss";

export interface DepartmentsPageProps {
    className?: string;
}

const DepartmentsPage = (props: DepartmentsPageProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.DepartmentsPage, {}, [className])}>
            <Typography.Title level={1}>{"Участки"}</Typography.Title>
        </div>
    );
};

export default memo(DepartmentsPage);
