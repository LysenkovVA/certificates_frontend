import { CertificateItem } from "@/entities/Certificate/ui/CertificateItem/CertificateItem";
import emailFieldSvg from "@/shared/assets/svg/emailField.svg";
import phoneFieldSvg from "@/shared/assets/svg/phoneField.svg";
import { classNames } from "@/shared/lib/classNames/classNames";
import { PreviewField } from "@/shared/ui/PreviewField";
import { Avatar, Divider, Flex, Typography } from "antd";
import { memo } from "react";
import { useSelector } from "react-redux";
import { getEmployeeDetails } from "../../model/selectors/getEmployeeDetails/getEmployeeDetails";
import cls from "./EmployeeDetailsView.module.scss";

interface EmployeeDetailsViewProps {
    className?: string;
}

export const EmployeeDetailsView = memo((props: EmployeeDetailsViewProps) => {
    const { className } = props;

    const employee = useSelector(getEmployeeDetails);

    return (
        <div className={classNames(cls.EmployeeDetailsView, {}, [className])}>
            <Flex vertical>
                <Flex gap={"large"}>
                    <Avatar className={cls.avatar} shape={"square"} />
                    <Flex vertical>
                        <Typography.Text className={cls.surname}>
                            {employee?.surname}
                        </Typography.Text>
                        <Typography.Text className={cls.name}>
                            {employee?.name}
                        </Typography.Text>
                        <Typography.Text type={"warning"} className={cls.name}>
                            {employee?.department?.organization?.name}
                        </Typography.Text>
                        <Typography.Text
                            type={"secondary"}
                            className={cls.name}
                        >
                            {employee?.department?.name}
                        </Typography.Text>
                    </Flex>
                </Flex>
                <PreviewField
                    component={phoneFieldSvg}
                    value={employee?.phone}
                />
                <PreviewField
                    component={emailFieldSvg}
                    value={employee?.email}
                />

                <Typography.Text className={cls.certificates_title}>
                    {"Удостоверения"}
                </Typography.Text>
                <Divider />
                <Flex>
                    {employee?.certificates &&
                        employee?.certificates?.length > 0 && (
                            <Flex gap={8} wrap={"wrap"} justify={"flex-start"}>
                                {employee?.certificates?.map((certificate) => (
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
