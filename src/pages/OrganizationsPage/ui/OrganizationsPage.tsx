import { classNames } from "@/shared/lib/classNames/classNames";
import { memo } from "react";
import cls from "./OrganizationsPage.module.scss";

interface OrganizationsPageProps {
    className?: string;
}

const OrganizationsPage = (props: OrganizationsPageProps) => {
    const { className } = props;

    return (
        <div
            className={classNames(cls.OrganizationsPage, {}, [className])}
        ></div>
    );
};

export default memo(OrganizationsPage);
