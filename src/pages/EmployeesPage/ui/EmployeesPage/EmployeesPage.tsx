import { EmployeeCard } from "@/entities/Employee";
import {
    getEmployees,
    getEmployeesError,
    getEmployeesIsLoading,
} from "@/pages/EmployeesPage/model/selectors/getEmployees/getEmployees";
import { fetchEmployees } from "@/pages/EmployeesPage/model/services/fetchEmployees";
import { employeesReducer } from "@/pages/EmployeesPage/model/slice/employeesSlice";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { classNames } from "@/shared/lib/classNames/classNames";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { Flex } from "antd";
import { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import cls from "./EmployeesPage.module.scss";

export interface EmployeesPageProps {
    className?: string;
}

const initialReducers: ReducersList = {
    employeesSchema: employeesReducer,
};

const EmployeesPage = (props: EmployeesPageProps) => {
    const { className } = props;

    const employees = useSelector(getEmployees);
    const isLoading = useSelector(getEmployeesIsLoading);
    const error = useSelector(getEmployeesError);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (__PROJECT_ENV__ !== "storybook") {
            // fetch employees
            dispatch(fetchEmployees({ limit: 30, offset: 0 }));
        }
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={initialReducers}>
            <div className={classNames(cls.CertificatesPage, {}, [className])}>
                {error && "Ошибка: " + error}
                <Flex wrap={"wrap"}>
                    {employees.length > 0
                        ? employees.map((employee) => (
                              <EmployeeCard
                                  key={employee.id}
                                  employee={employee}
                              />
                          ))
                        : "Пусто"}
                </Flex>
            </div>
        </DynamicModuleLoader>
    );
};

export default memo(EmployeesPage);
