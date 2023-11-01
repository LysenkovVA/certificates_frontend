import { classNames } from "@/shared/lib/classNames/classNames";
import { memo } from "react";
import cls from "./CertificatesPage.module.scss";

interface CertificatesPageProps {
    className?: string;
}

const CertificatesPage = (props: CertificatesPageProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.CertificatesPage, {}, [className])}>
            {"Certificates page"}
        </div>
    );
};

export default memo(CertificatesPage);
