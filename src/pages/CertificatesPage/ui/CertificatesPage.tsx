import { CertificatesInfiniteList } from "@/features/Certificates/certificatesList";
import { memo } from "react";

export interface CertificatesPageProps {
    className?: string;
}

const CertificatesPage = (props: CertificatesPageProps) => {
    const { className } = props;

    return <CertificatesInfiniteList />;
};

export default memo(CertificatesPage);
