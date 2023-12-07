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

    const employeeDetails = useSelector(getEmployeeDetails);

    return (
        <div className={classNames(cls.EmployeeDetailsView, {}, [className])}>
            <Flex vertical>
                <Flex gap={"large"}>
                    <Avatar className={cls.avatar} shape={"square"} />
                    <Flex
                        align={"start"}
                        flex={"content"}
                        justify={"space-between"}
                    >
                        <Flex vertical>
                            <Typography.Text className={cls.surname}>
                                {employeeDetails?.surname}
                            </Typography.Text>
                            <Typography.Text className={cls.name}>
                                {employeeDetails?.name}
                            </Typography.Text>
                            <Typography.Text type={"secondary"}>
                                {employeeDetails?.berth?.value}
                            </Typography.Text>
                        </Flex>
                        <Flex vertical justify={"flex-end"} align={"flex-end"}>
                            <Typography.Text
                                type={"warning"}
                                className={cls.name}
                            >
                                {
                                    employeeDetails?.department?.organization
                                        ?.name
                                }
                            </Typography.Text>
                            <Typography.Text
                                type={"secondary"}
                                className={cls.name}
                            >
                                {employeeDetails?.department?.name}
                            </Typography.Text>
                        </Flex>
                    </Flex>
                </Flex>
                <PreviewField
                    component={phoneFieldSvg}
                    value={employeeDetails?.phone}
                />
                <PreviewField
                    component={emailFieldSvg}
                    value={employeeDetails?.email}
                />
                <Divider orientation={"left"} orientationMargin={0}>
                    Удостоверения
                </Divider>
                <Flex>
                    {employeeDetails?.certificates &&
                        employeeDetails?.certificates?.length > 0 && (
                            <Flex gap={8} wrap={"wrap"} justify={"flex-start"}>
                                {employeeDetails?.certificates?.map(
                                    (certificate, index) => (
                                        <CertificateItem
                                            className={classNames(
                                                cls.certificate,
                                            )}
                                            key={certificate.id}
                                            certificate={certificate}
                                        />
                                    ),
                                )}
                            </Flex>
                        )}
                </Flex>
            </Flex>
        </div>
    );
});
