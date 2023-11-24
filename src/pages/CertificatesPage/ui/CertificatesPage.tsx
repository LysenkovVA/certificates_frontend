import { classNames } from "@/shared/lib/classNames/classNames";
import { Typography } from "antd";
import { memo } from "react";
import cls from "./CertificatesPage.module.scss";

export interface CertificatesPageProps {
    className?: string;
}

const CertificatesPage = (props: CertificatesPageProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.CertificatesPage, {}, [className])}>
            <Typography.Title level={1}>{"Удостоверения"}</Typography.Title>
        </div>
    );
};

export default memo(CertificatesPage);
