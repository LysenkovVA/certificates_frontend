import { CertificateItem } from "@/entities/Certificate/ui/CertificateItem/CertificateItem";
import { IEmployee } from "@/entities/Employee/model/types/IEmployee";
import emailFieldSvg from "@/shared/assets/svg/emailField.svg";
import phoneFieldSvg from "@/shared/assets/svg/phoneField.svg";
import { classNames } from "@/shared/lib/classNames/classNames";
import { PreviewField } from "@/shared/ui/PreviewField";
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
                    <Avatar className={cls.avatar} shape={"square"} />
                    <Flex vertical>
                        <Typography.Text className={cls.surname}>
                            {employee.surname}
                        </Typography.Text>
                        <Typography.Text className={cls.name}>
                            {employee.name}
                        </Typography.Text>
                    </Flex>
                </Flex>
                <PreviewField
                    component={phoneFieldSvg}
                    value={employee.phone}
                />
                <PreviewField
                    component={emailFieldSvg}
                    value={employee.email}
                />
                <Typography.Text className={cls.certificates_title}>
                    {"Удостоверения"}
                </Typography.Text>
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
