import { IConstructionObject } from "@/entities/ConstructionObject";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Card, Flex, Typography } from "antd";
import dayjs from "dayjs";
import { memo } from "react";
import cls from "./ConstructionObjectCard.module.scss";

interface ConstructionObjectCardProps {
    className?: string;
    constructionObject: IConstructionObject;
}

export const ConstructionObjectCard = memo(
    (props: ConstructionObjectCardProps) => {
        const { className, constructionObject } = props;
        return (
            <Card
                className={classNames(cls.DepartmentCard, {}, [className])}
                title={constructionObject?.name}
            >
                <Flex vertical>
                    <Typography.Text>
                        {constructionObject?.address}
                    </Typography.Text>
                    <Typography.Text>
                        {dayjs(constructionObject?.startDate).format(
                            "DD.MM.YYYY",
                        )}
                    </Typography.Text>
                    <Typography.Text>
                        {dayjs(constructionObject?.endDate).format(
                            "DD.MM.YYYY",
                        )}
                    </Typography.Text>
                </Flex>
            </Card>
        );
    },
);
