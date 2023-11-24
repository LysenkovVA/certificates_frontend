import {
    getEmployeeDetailsForm,
    getEmployeeDetailsIsInited,
} from "@/entities/Employee/model/selectors/getEmployeeDetails/getEmployeeDetails";
import { fetchEmployeeById } from "@/entities/Employee/model/services/fetchEmployeeById/fetchEmployeeById";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { SaveCancelButtons } from "@/shared/ui/SaveCancelButtons/SaveCancelButtons";
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

    // Можно редактировать
    const [canEdit, setCanEdit] = useState(true);

    const dispatch = useAppDispatch();
    const employee = useSelector(getEmployeeDetailsForm);
    const isInited = useSelector(getEmployeeDetailsIsInited);

    useEffect(() => {
        if (__PROJECT_ENV__ !== "storybook" && !isInited) {
            dispatch(fetchEmployeeById({ id: employeeId }));
        }
    }, [dispatch, employeeId, isInited]);

    const onEditClick = useCallback(() => {
        setCanEdit(false);
    }, []);

    const onSaveClick = useCallback(() => {
        setCanEdit(true);
    }, []);

    const onCancelClick = useCallback(() => {
        setCanEdit(true);
    }, []);

    // if (!employee) {
    //     return <div>Ошибка</div>;
    // }

    const extraContent = (
        <>
            {canEdit ? (
                <a onClick={onEditClick}>Изменить</a>
            ) : (
                <SaveCancelButtons
                    onSaveClick={onSaveClick}
                    onCancelClick={onCancelClick}
                />
            )}
        </>
    );

    return (
        <Card
            extra={extraContent}
            title={`${employee?.surname} ${employee?.name}`}
            className={classNames(cls.EmployeeDetailsCard, {}, [className])}
        >
            {!canEdit ? <EmployeeDetailsForm /> : <EmployeeDetailsView />}
        </Card>
    );
});
