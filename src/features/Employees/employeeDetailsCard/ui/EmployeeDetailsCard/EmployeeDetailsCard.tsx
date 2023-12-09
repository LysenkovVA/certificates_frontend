import { classNames } from "@/shared/lib/classNames/classNames";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { SaveCancelButtons } from "@/shared/ui/SaveCancelButtons/SaveCancelButtons";
import { InfiniteScrollPage } from "@/widgets/InfiniteScrollPage";
import { Card } from "antd";
import { memo, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { employeesInfiniteListActions } from "../../../employeesInfiniteList/model/slice/employeesInfiniteListSlice";
import {
    getEmployeeDetails,
    getEmployeeDetailsForm,
    getEmployeeDetailsFormAvatar,
    getEmployeeDetailsIsDataLoading,
    getEmployeeDetailsIsInitialized,
} from "../../model/selectors/getEmployeeDetails/getEmployeeDetails";
import { fetchEmployeeDetailsById } from "../../model/services/fetchEmployeeDetailsById/fetchEmployeeDetailsById";
import { updateEmployeeAvatar } from "../../model/services/updateEmployeeAvatar/updateEmployeeAvatar";
import { updateEmployeeDetailsById } from "../../model/services/updateEmployeeDetailsById/updateEmployeeDetailsById";
import {
    employeeDetailsActions,
    employeeDetailsReducer,
} from "../../model/slice/employeeDetailsSlice";
import { EmployeeDetailsForm } from "../EmployeeDetailsForm/EmployeeDetailsForm";
import { EmployeeDetailsView } from "../EmployeeDetailsView/EmployeeDetailsView";
import cls from "./EmployeeDetailsCard.module.scss";

interface EmployeeDetailsCardProps {
    className?: string;
}

const reducers: ReducersList = {
    employeeDetailsSchema: employeeDetailsReducer,
};

export const EmployeeDetailsCard = memo((props: EmployeeDetailsCardProps) => {
    const { className } = props;

    const { id: employeeId } = useParams<{ id: string }>();

    // Можно редактировать
    const [canEdit, setCanEdit] = useState(true);

    const dispatch = useAppDispatch();
    const isLoadingData = useSelector(getEmployeeDetailsIsDataLoading);
    const employeeDetails = useSelector(getEmployeeDetails);
    const employeeDetailsForm = useSelector(getEmployeeDetailsForm);
    const formAvatar = useSelector(getEmployeeDetailsFormAvatar);
    const isInitialized = useSelector(getEmployeeDetailsIsInitialized);

    useEffect(() => {
        if (!isInitialized && employeeId && !isLoadingData) {
            dispatch(fetchEmployeeDetailsById({ id: employeeId }));
        }
    }, [dispatch, employeeId, isInitialized, isLoadingData]);

    const onEditClick = useCallback(() => {
        setCanEdit(false);
    }, []);

    const onSaveClick = useCallback(async () => {
        await dispatch(
            updateEmployeeDetailsById({ employee: employeeDetailsForm! }),
        );

        // Получаем новые данные (лишний запрос!)
        if (employeeDetails) {
            await dispatch(
                fetchEmployeeDetailsById({ id: employeeDetails.id! }),
            );
        }

        // Обновляем аватар
        if (formAvatar && employeeDetails?.id) {
            const blob = await fetch(formAvatar).then((r) => r.blob());
            await dispatch(
                updateEmployeeAvatar({
                    employeeId: employeeDetails.id,
                    file: blob,
                }),
            );
        }

        // Обновляем запись в списке сотрудников
        if (employeeDetails) {
            dispatch(
                employeesInfiniteListActions.updateEmployee(employeeDetails),
            );
        }

        setCanEdit(true);
    }, [dispatch, employeeDetails, employeeDetailsForm, formAvatar]);

    const onCancelClick = useCallback(() => {
        // Возвращаем обратно значения сотрудника
        dispatch(
            employeeDetailsActions.setEmployeeDetailsFormData({
                ...employeeDetails,
            }),
        );
        // Возвращаем обратно значение аватара
        dispatch(employeeDetailsActions.setEmployeeDetailsFormDataAvatar(""));
        setCanEdit(true);
    }, [dispatch, employeeDetails]);

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
        <DynamicModuleLoader reducers={reducers}>
            <InfiniteScrollPage>
                <Card
                    extra={extraContent}
                    title={`${employeeDetailsForm?.surname} ${employeeDetailsForm?.name}`}
                    className={classNames(cls.EmployeeDetailsCard, {}, [
                        className,
                    ])}
                >
                    {!canEdit ? (
                        <EmployeeDetailsForm />
                    ) : (
                        <EmployeeDetailsView />
                    )}
                </Card>
            </InfiniteScrollPage>
        </DynamicModuleLoader>
    );
});
