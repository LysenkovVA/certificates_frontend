import { CertificateItem } from "@/entities/Certificate/ui/CertificateItem/CertificateItem";
import { IEmployee } from "@/entities/Employee/model/types/IEmployee";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Avatar, Divider, Flex, Typography } from "antd";
import { memo } from "react";
import cls from "./EmployeeDetailsView.module.scss";

interface EmployeeDetailsViewProps {
    className?: string;
    employee: IEmployee;
}

export const EmployeeDetailsView = memo((props: EmployeeDetailsViewProps) => {
    const { className, employee } = props;
    return (
        <div className={classNames(cls.EmployeeDetailsView, {}, [className])}>
            <Flex vertical>
                <Flex gap={"large"}>
                    <Avatar
                        shape={"square"}
                        style={{ width: 100, height: 100 }}
                    />
                    <Flex vertical>
                        <Typography.Text>{employee.surname}</Typography.Text>
                        <Typography.Text>{employee.name}</Typography.Text>
                    </Flex>
                </Flex>
                <Divider />
                <Flex>
                    {employee.certificates &&
                        employee.certificates?.length > 0 && (
                            <Flex gap={8} wrap={"wrap"} justify={"flex-start"}>
                                {employee.certificates.map((certificate) => (
                                    <CertificateItem
                                        className={classNames(cls.certificate)}
                                        key={certificate.id}
                                        certificate={certificate}
                                    />
                                ))}
                            </Flex>
                        )}
                </Flex>
            </Flex>
        </div>
    );
});
