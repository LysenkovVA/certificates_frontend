import { EmployeeCard } from "@/entities/Employee";
import {
    getEmployees,
    getEmployeesError,
    getEmployeesHasMore,
    getEmployeesIsInitialized,
    getEmployeesIsLoading,
} from "@/pages/EmployeesPage/model/selectors/getEmployees/getEmployees";
import { fetchEmployeesNextPart } from "@/pages/EmployeesPage/model/services/fetchEmployeesNextPart/fetchEmployeesNextPart";
import { initializeEmployeesPage } from "@/pages/EmployeesPage/model/services/initializeEmployeesPage/initializeEmployeesPage";
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
import { Button, Flex, Skeleton } from "antd";
import { memo, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

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
    const isInitialized = useSelector(getEmployeesIsInitialized);
    const hasMore = useSelector(getEmployeesHasMore);

    console.log("Employees page count: " + employees.length);

    // Получаем параметры из строки запроса
    const [searchParams] = useSearchParams();

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (__PROJECT_ENV__ !== "storybook" && !isInitialized) {
            dispatch(initializeEmployeesPage(searchParams));
        }
    }, [dispatch, isInitialized, searchParams]);

    const navigate = useNavigate();

    const onClick = useCallback(
        (id: string | undefined) => {
            if (id) {
                navigate(RoutePath.employee_details + id);
            }
        },
        [navigate],
    );

    const onMoreClick = useCallback(() => {
        dispatch(fetchEmployeesNextPart());
    }, [dispatch]);

    const onSearch = useCallback(
        (value: string | undefined) => {
            dispatch(employeesPageActions.setSearchQuery(value));
        },
        [dispatch],
    );

    return (
        <DynamicModuleLoader
            reducers={initialReducers}
            removeAfterUnmount={false}
        >
            {isLoading ? (
                <Skeleton active />
            ) : (
                <Flex vertical gap={16}>
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
            )}
            <Button disabled={!hasMore} onClick={onMoreClick}>
                More
            </Button>
        </DynamicModuleLoader>
    );
};

export default memo(EmployeesPage);
