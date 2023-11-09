import { getEmployeeDetails } from "@/entities/Employee/model/selectors/getEmployeeDetails/getEmployeeDetails";
import { fetchEmployeeById } from "@/entities/Employee/model/services/fetchEmployeeById/fetchEmployeeById";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Card } from "antd";
import { memo, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { EmployeeDetailsForm } from "../EmployeeDetailsForm/EmployeeDetailsForm";
import { EmployeeDetailsView } from "../EmployeeDetailsView/EmployeeDetailsView";
import cls from "./EmployeeDetailsCard.module.scss";

interface EmployeeDetailsCardProps {
    className?: string;
    employeeId: string;
}

export const EmployeeDetailsCard = memo((props: EmployeeDetailsCardProps) => {
    const { className, employeeId } = props;
    const [canEdit, setCanEdit] = useState(false);

    const dispatch = useAppDispatch();

    const employee = useSelector(getEmployeeDetails);

    useEffect(() => {
        if (__PROJECT_ENV__ !== "storybook") {
            dispatch(fetchEmployeeById({ id: employeeId }));
        }
    }, [dispatch, employeeId]);

    const onEditClick = useCallback(() => {
        setCanEdit(true);
    }, []);

    const onSaveClick = useCallback(() => {
        setCanEdit(false);
    }, []);

    const onCancelClick = useCallback(() => {
        setCanEdit(false);
    }, []);

    return (
        <Card
            title={"Карточка сотрудника"}
            className={classNames(cls.EmployeeDetailsCard, {}, [className])}
        >
            {canEdit ? (
                <EmployeeDetailsForm employee={employee} />
            ) : (
                <EmployeeDetailsView employee={employee} />
            )}
        </Card>
    );
});
