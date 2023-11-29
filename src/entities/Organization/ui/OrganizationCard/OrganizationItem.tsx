import { Organization } from "@/entities/Organization";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Card, Typography } from "antd";
import { memo } from "react";
import cls from "./OrganizationItem.module.scss";

interface OrganizationItemProps {
    className?: string;
    organization: Organization;
}

export const OrganizationItem = memo((props: OrganizationItemProps) => {
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
