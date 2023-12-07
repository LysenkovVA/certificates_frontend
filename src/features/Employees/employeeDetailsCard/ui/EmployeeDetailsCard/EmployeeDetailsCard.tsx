import { getEmployeeDetailsError } from "@/features/Employees/employeeDetailsCard/model/selectors/getEmployeeDetailsError/getEmployeeDetailsError";
import { getEmployeeDetailsIsLoading } from "@/features/Employees/employeeDetailsCard/model/selectors/getEmployeeDetailsIsLoading/getEmployeeDetailsIsLoading";
import { fetchEmployeeDetailsById } from "@/features/Employees/employeeDetailsCard/model/services/fetchEmployeeDetailsById/fetchEmployeeDetailsById";
import { updateEmployeeDetailsById } from "@/features/Employees/employeeDetailsCard/model/services/updateEmployeeDetailsById/updateEmployeeDetailsById";
import { employeeDetailsReducer } from "@/features/Employees/employeeDetailsCard/model/slice/employeeDetailsSlice";
import { classNames } from "@/shared/lib/classNames/classNames";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";
import { ErrorInfo } from "@/shared/ui/ErrorInfo/ErrorInfo";
import { SaveCancelButtons } from "@/shared/ui/SaveCancelButtons/SaveCancelButtons";
import { InfiniteScrollPage } from "@/widgets/InfiniteScrollPage";
import { Card } from "antd";
import { memo, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    getEmployeeAvatar,
    getEmployeeDetailsForm,
    getEmployeeDetailsIsInitialized,
} from "../../model/selectors/getEmployeeDetails/getEmployeeDetails";
import { EmployeeDetailsForm } from "../EmployeeDetailsForm/EmployeeDetailsForm";
import { EmployeeDetailsView } from "../EmployeeDetailsView/EmployeeDetailsView";
import cls from "./EmployeeDetailsCard.module.scss";

interface EmployeeDetailsCardProps {
    className?: string;
    //employeeId: string;
}

const reducers: ReducersList = {
    employeeDetailsSchema: employeeDetailsReducer,
};

export const EmployeeDetailsCard = memo((props: EmployeeDetailsCardProps) => {
    const { className } = props;

    const { id: employeeId } = useParams<{ id: string }>();

    const [newAvatar, setNewAvatar] = useState<string>();

    // Можно редактировать
    const [canEdit, setCanEdit] = useState(true);

    const dispatch = useAppDispatch();
    const employeeDetailsForm = useSelector(getEmployeeDetailsForm);
    const isLoading = useSelector(getEmployeeDetailsIsLoading);
    const error = useSelector(getEmployeeDetailsError);
    const avatar = useSelector(getEmployeeAvatar);
    const isInited = useSelector(getEmployeeDetailsIsInitialized);

    useInitialEffect(() => {
        if (!isInited && employeeId) {
            dispatch(fetchEmployeeDetailsById({ id: employeeId }));
        }
    });

    const onEditClick = useCallback(() => {
        setCanEdit(false);
    }, []);

    const onSaveClick = useCallback(() => {
        if (employeeDetailsForm) {
            dispatch(
                updateEmployeeDetailsById({ employee: employeeDetailsForm }),
            );
            setCanEdit(true);
        }
    }, [dispatch, employeeDetailsForm]);

    const onCancelClick = useCallback(() => {
        setCanEdit(true);
    }, []);

    const extraContent = (
        <>
            {canEdit ? (
                <a onClick={onEditClick}>Изменить</a>
            ) : (
                <SaveCancelButtons
                    isLoading={isLoading}
                    onSaveClick={onSaveClick}
                    onCancelClick={onCancelClick}
                />
            )}
        </>
    );

    const onChangeAvatar = useCallback((value: string | undefined) => {
        setNewAvatar(value);
    }, []);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <InfiniteScrollPage>
                {error && (
                    <ErrorInfo status={"error"} title={error} subtitle={""} />
                )}
                {!error && (
                    <Card
                        extra={extraContent}
                        title={`${employeeDetailsForm?.surname} ${employeeDetailsForm?.name}`}
                        className={classNames(cls.EmployeeDetailsCard, {}, [
                            className,
                        ])}
                    >
                        {!canEdit ? (
                            <EmployeeDetailsForm
                                avatar={newAvatar ?? avatar}
                                onChangeAvatar={onChangeAvatar}
                            />
                        ) : (
                            <EmployeeDetailsView />
                        )}
                    </Card>
                )}
            </InfiniteScrollPage>
        </DynamicModuleLoader>
    );
});
