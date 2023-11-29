import { EmployeeItem } from "@/entities/Employee";
import { RoutePath } from "@/shared/config/routeConfig/routeConfig";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Button, Flex, Skeleton } from "antd";
import { memo, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getEmployeesList } from "../model/selectors/getEmployees/getEmployees";
import { getEmployeesListError } from "../model/selectors/getEmployeesError/getEmployeesError";
import { getEmployeeListsHasMore } from "../model/selectors/getEmployeesHasMore/getEmployeesHasMore";
import { getEmployeesListIsInitialized } from "../model/selectors/getEmployeesIsInitialized/getEmployeesIsInitialized";
import { getEmployeesListIsLoading } from "../model/selectors/getEmployeesIsLoading/getEmployeesIsLoading";
import { fetchEmployeesNextPart } from "../model/services/fetchEmployeesNextPart/fetchEmployeesNextPart";
import { initializeEmployeesPage } from "../model/services/initializeEmployeesPage/initializeEmployeesPage";
import { employeesPageReducer } from "../model/slice/employeesPageSlice";

interface EmployeesListProps {
    className?: string;
}

const initialReducers: ReducersList = {
    employeesPageSchema: employeesPageReducer,
};

export const EmployeesList = memo((props: EmployeesListProps) => {
    const { className } = props;
    const employees = useSelector(getEmployeesList.selectAll);
    const isLoading = useSelector(getEmployeesListIsLoading);
    const error = useSelector(getEmployeesListError);
    const isInitialized = useSelector(getEmployeesListIsInitialized);
    const hasMore = useSelector(getEmployeeListsHasMore);
    // const searchQuery = useSelector(getEmployeesListSearchQuery);

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

    return (
        <DynamicModuleLoader reducers={initialReducers}>
            {isLoading ? (
                <Skeleton active />
            ) : (
                <Flex vertical gap={16}>
                    {/*<SearchBar*/}
                    {/*    placeholder={"Поиск сотрудников..."}*/}
                    {/*    searchQuery={searchQuery}*/}
                    {/*    onSearch={onSearch}*/}
                    {/*/>*/}
                    {error && "Ошибка: " + error}
                    <Flex vertical wrap={"wrap"}>
                        {employees.length > 0
                            ? employees.map((employee) => (
                                  <EmployeeItem
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
});
