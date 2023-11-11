import { EmployeeCard } from "@/entities/Employee";
import { SearchBar } from "@/features/searchBar";
import {
    getEmployees,
    getEmployeesError,
    getEmployeesIsLoading,
    getEmployeesSearchQuery,
} from "@/pages/EmployeesPage/model/selectors/getEmployees/getEmployees";
import { fetchEmployees } from "@/pages/EmployeesPage/model/services/fetchEmployees";
import {
    employeesPageActions,
    employeesPageReducer,
} from "@/pages/EmployeesPage/model/slice/employeesPageSlice";
import { RoutePath } from "@/shared/config/routeConfig/routeConfig";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { Flex } from "antd";
import { memo, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export interface EmployeesPageProps {
    className?: string;
}

const initialReducers: ReducersList = {
    employeesPageSchema: employeesPageReducer,
};

const EmployeesPage = (props: EmployeesPageProps) => {
    const { className } = props;

    const employees = useSelector(getEmployees.selectAll);
    const isLoading = useSelector(getEmployeesIsLoading);
    const error = useSelector(getEmployeesError);
    const searchQuery = useSelector(getEmployeesSearchQuery);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (__PROJECT_ENV__ !== "storybook") {
            // fetch employees
            dispatch(fetchEmployees({ limit: 20, offset: 0 }));
        }
    }, [dispatch]);

    const navigate = useNavigate();

    const onClick = useCallback(
        (id: string | undefined) => {
            if (id) {
                navigate(RoutePath.employee_details + id);
            }
        },
        [navigate],
    );

    const onSearch = useCallback(
        (value: string | undefined) => {
            dispatch(employeesPageActions.setSearchQuery(value));
        },
        [dispatch],
    );

    return (
        <DynamicModuleLoader reducers={initialReducers}>
            <Flex vertical gap={16}>
                <SearchBar searchQuery={searchQuery} onSearch={onSearch} />
                {error && "Ошибка: " + error}
                <Flex wrap={"wrap"}>
                    {employees.length > 0
                        ? employees.map((employee) => (
                              <EmployeeCard
                                  key={employee.id}
                                  employee={employee}
                                  onClick={onClick}
                              />
                          ))
                        : "Пусто"}
                </Flex>
            </Flex>
        </DynamicModuleLoader>
    );
};

export default memo(EmployeesPage);
