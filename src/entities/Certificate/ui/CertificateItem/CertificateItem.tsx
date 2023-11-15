import { ICertificate } from "@/entities/Certificate/model/types/ICertificate";
import dateFieldSvg from "@/shared/assets/svg/dateField.svg";
import groupFieldSvg from "@/shared/assets/svg/groupField.svg";
import numberFieldSvg from "@/shared/assets/svg/numberField.svg";
import { classNames } from "@/shared/lib/classNames/classNames";
import { PreviewField } from "@/shared/ui/PreviewField";
import { Card, Flex } from "antd";
import dayjs from "dayjs";
import { memo } from "react";
import cls from "./CertificateItem.module.scss";

interface CertificateItemProps {
    className?: string;
    certificate: ICertificate;
}

export const CertificateItem = memo((props: CertificateItemProps) => {
    const { className, certificate } = props;
    return (
        <Card
            hoverable
            title={certificate.certificateType?.value ?? "Удостоверение"}
            headStyle={{ color: "green" }}
            className={classNames(cls.CertificateItem, {}, [className])}
        >
            <Flex vertical>
                <PreviewField
                    component={numberFieldSvg}
                    value={certificate.number}
                />
                <PreviewField
                    component={dateFieldSvg}
                    value={dayjs(certificate.startDate).format("DD.MM.YYYY")}
                />
                {certificate.certificateType?.hasGroups && (
                    <PreviewField
                        component={groupFieldSvg}
                        value={String(certificate.group)}
                    />
                )}
            </Flex>
        </Card>
    );
});
