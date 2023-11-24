import { classNames } from "@/shared/lib/classNames/classNames";
import { Typography } from "antd";
import { memo } from "react";
import cls from "./ConstructionObjectsPage.module.scss";

export interface ConstructionObjectsPageProps {
    className?: string;
}

const ConstructionObjectsPage = (props: ConstructionObjectsPageProps) => {
    const { className } = props;

    return (
        <div
            className={classNames(cls.ConstructionObjectsPage, {}, [className])}
        >
            <Typography.Title level={1}>{"Объекты"}</Typography.Title>
        </div>
    );
};

export default memo(ConstructionObjectsPage);
