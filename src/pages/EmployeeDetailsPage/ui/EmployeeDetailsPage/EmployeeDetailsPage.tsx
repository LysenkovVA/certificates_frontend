import { EmployeeDetailsCard } from "@/entities/Employee";
import { employeeDetailsReducer } from "@/entities/Employee/model/slice/employeeSlice";
import { classNames } from "@/shared/lib/classNames/classNames";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { memo } from "react";
import { useParams } from "react-router-dom";
import cls from "./EmployeeDetailsPage.module.scss";

interface EmployeeDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    employeeDetailsSchema: employeeDetailsReducer,
};

const EmployeeDetailsPage = (props: EmployeeDetailsPageProps) => {
    const { className } = props;

    const { id } = useParams<{ id: string }>();

    const content = (
        <>
            {!id ? (
                <div>Не найдено</div>
            ) : (
                <div
                    className={classNames(cls.EmployeeDetailsPage, {}, [
                        className,
                    ])}
                >
                    <EmployeeDetailsCard employeeId={id} />
                </div>
            )}
        </>
    );

    return (
        <DynamicModuleLoader reducers={reducers}>{content}</DynamicModuleLoader>
    );
};

export default memo(EmployeeDetailsPage);
