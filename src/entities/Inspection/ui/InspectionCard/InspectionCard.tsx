import { IInspection } from "@/entities/Inspection";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Card, Flex, Typography } from "antd";
import dayjs from "dayjs";
import { memo } from "react";
import cls from "./InspectionCard.module.scss";

interface InspectionCardProps {
    className?: string;
    inspection: IInspection;
}

export const InspectionCard = memo((props: InspectionCardProps) => {
    const { className, inspection } = props;
    return (
        <Card
            className={classNames(cls.DepartmentCard, {}, [className])}
            title={dayjs(inspection?.date).format("DD.MM.YYYY")}
        >
            <Flex vertical gap={0}>
                <Flex gap={4}>
                    {inspection?.inspectionType?.value &&
                    inspection.inspectionType.value === "Плановая" ? (
                        <Typography.Text keyboard>
                            {inspection?.inspectionType?.value}
                        </Typography.Text>
                    ) : (
                        <Typography.Text keyboard type={"danger"}>
                            {inspection?.inspectionType?.value}
                        </Typography.Text>
                    )}
                    {inspection?.isCommitional && (
                        <Typography.Text type={"success"} keyboard>
                            {"Комиссионная"}
                        </Typography.Text>
                    )}
                </Flex>
                <Typography.Text>
                    {inspection?.constructionObject?.address}
                </Typography.Text>
                <Typography.Text>
                    {inspection?.constructionObject?.name}
                </Typography.Text>
                <Flex gap={8}>
                    <Typography.Text>
                        {inspection?.resultDocumentType?.value}
                    </Typography.Text>
                    <Typography.Text>
                        {inspection?.documentNumber}
                    </Typography.Text>
                    <Typography.Text>
                        {`от ${dayjs(inspection?.documentDate).format(
                            "DD.MM.YYYY",
                        )}`}
                    </Typography.Text>
                </Flex>
            </Flex>
        </Card>
    );
});
