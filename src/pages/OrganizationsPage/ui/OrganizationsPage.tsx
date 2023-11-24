import { classNames } from "@/shared/lib/classNames/classNames";
import { Typography } from "antd";
import { memo } from "react";
import cls from "./OrganizationsPage.module.scss";

interface OrganizationsPageProps {
    className?: string;
}

const OrganizationsPage = (props: OrganizationsPageProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.OrganizationsPage, {}, [className])}>
            <Typography.Title level={1}>{"Организации"}</Typography.Title>
        </div>
    );
};

export default memo(OrganizationsPage);
