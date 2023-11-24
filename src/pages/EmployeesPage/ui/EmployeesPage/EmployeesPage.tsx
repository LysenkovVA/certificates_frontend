import { EmployeeCard } from "@/entities/Employee";
import { SearchBar } from "@/features/searchBar";
import { getEmployees } from "@/pages/EmployeesPage/model/selectors/getEmployees/getEmployees";
import { getEmployeesError } from "@/pages/EmployeesPage/model/selectors/getEmployeesError/getEmployeesError";
import { getEmployeesHasMore } from "@/pages/EmployeesPage/model/selectors/getEmployeesHasMore/getEmployeesHasMore";
import { getEmployeesIsInitialized } from "@/pages/EmployeesPage/model/selectors/getEmployeesIsInitialized/getEmployeesIsInitialized";
import { getEmployeesIsLoading } from "@/pages/EmployeesPage/model/selectors/getEmployeesIsLoading/getEmployeesIsLoading";
import { getEmployeesSearchQuery } from "@/pages/EmployeesPage/model/selectors/getEmployeesSearchQuery/getEmployeesSearchQuery";
import { fetchEmployees } from "@/pages/EmployeesPage/model/services/fetchEmployees/fetchEmployees";
import { fetchEmployeesNextPart } from "@/pages/EmployeesPage/model/services/fetchEmployeesNextPart/fetchEmployeesNextPart";
import { initializeEmployeesPage } from "@/pages/EmployeesPage/model/services/initializeEmployeesPage/initializeEmployeesPage";
import {
    employeesPageActions,
    employeesPageReducer,
} from "@/pages/EmployeesPage/model/slice/employeesPageSlice";
import { RoutePath } from "@/shared/config/routeConfig/routeConfig";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useDebounce } from "@/shared/lib/hooks/useDebounce/useDebounce";
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
    const searchQuery = useSelector(getEmployeesSearchQuery);

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

    const fetchData = useCallback(() => {
        dispatch(fetchEmployees({ replaceData: true }));
    }, [dispatch]);

    const debouncedFetchData = useDebounce(fetchData, 1000);

    const onSearch = useCallback(
        (value: string | undefined) => {
            dispatch(employeesPageActions.setSearchQuery(value));
            debouncedFetchData();
        },
        [debouncedFetchData, dispatch],
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
                    <SearchBar
                        placeholder={"Поиск сотрудников..."}
                        searchQuery={searchQuery}
                        onSearch={onSearch}
                    />
                    {error && "Ошибка: " + error}
                    <Flex vertical wrap={"wrap"}>
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
