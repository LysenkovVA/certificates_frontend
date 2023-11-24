import { IOrganization } from "@/entities/Organization";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Card, Typography } from "antd";
import { memo } from "react";
import cls from "./OrganizationCard.module.scss";

interface OrganizationCardProps {
    className?: string;
    organization: IOrganization;
}

export const OrganizationCard = memo((props: OrganizationCardProps) => {
    const { className, organization } = props;
    return (
        <Card
            className={classNames(cls.OrganizationCard, {}, [className])}
            title={organization.name}
        >
            <Typography.Text>{"Контент"}</Typography.Text>
        </Card>
    );
});
