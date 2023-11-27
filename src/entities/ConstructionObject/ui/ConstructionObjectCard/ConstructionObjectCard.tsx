import { IConstructionObject } from "@/entities/ConstructionObject";
import addressSvg from "@/shared/assets/svg/addressField.svg";
import endDateSvg from "@/shared/assets/svg/dateEnd.svg";
import startDateSvg from "@/shared/assets/svg/dateStart.svg";
import { classNames } from "@/shared/lib/classNames/classNames";
import { PreviewField } from "@/shared/ui/PreviewField";
import { Card, Flex } from "antd";
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
                <Flex vertical gap={8}>
                    <PreviewField
                        component={addressSvg}
                        value={constructionObject?.address}
                    />
                    <Flex gap={"small"}>
                        <PreviewField
                            component={startDateSvg}
                            value={dayjs(constructionObject?.startDate).format(
                                "DD.MM.YYYY",
                            )}
                        />
                        {" - "}
                        <PreviewField
                            component={endDateSvg}
                            value={dayjs(constructionObject?.endDate).format(
                                "DD.MM.YYYY",
                            )}
                        />
                    </Flex>
                </Flex>
            </Card>
        );
    },
);
