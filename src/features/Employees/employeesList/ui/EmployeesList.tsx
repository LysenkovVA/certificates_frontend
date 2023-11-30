import { EmployeeItem } from "@/entities/Employee";
import { getEmployeesListLimit } from "@/features/Employees/employeesList/model/selectors/getEmployeesLimit/getEmployeesLimit";
import { getEmployeesListOffset } from "@/features/Employees/employeesList/model/selectors/getEmployeesOffset/getEmployeesOffset";
import { fetchEmployees } from "@/features/Employees/employeesList/model/services/fetchEmployees/fetchEmployees";
import { RoutePath } from "@/shared/config/routeConfig/routeConfig";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";
import { InfiniteScrollPage } from "@/widgets/InfiniteScrollPage";
import { Flex, Typography } from "antd";
import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getEmployeesList } from "../model/selectors/getEmployees/getEmployees";
import { getEmployeesListError } from "../model/selectors/getEmployeesError/getEmployeesError";
import { getEmployeeListsHasMore } from "../model/selectors/getEmployeesHasMore/getEmployeesHasMore";
import { getEmployeesListIsInitialized } from "../model/selectors/getEmployeesIsInitialized/getEmployeesIsInitialized";
import { getEmployeesListIsLoading } from "../model/selectors/getEmployeesIsLoading/getEmployeesIsLoading";
import { initializeEmployeesPage } from "../model/services/initializeEmployeesPage/initializeEmployeesPage";
import {
    employeesPageActions,
    employeesPageReducer,
} from "../model/slice/employeesPageSlice";

interface EmployeesListProps {
    className?: string;
}

const initialReducers: ReducersList = {
    employeesPageSchema: employeesPageReducer,
};

export const EmployeesList = memo((props: EmployeesListProps) => {
    const { className } = props;

    // Получаем параметры из строки запроса
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const employees = useSelector(getEmployeesList.selectAll);
    const isLoading = useSelector(getEmployeesListIsLoading);
    const error = useSelector(getEmployeesListError);
    const limit = useSelector(getEmployeesListLimit);
    const offset = useSelector(getEmployeesListOffset);
    const hasMore = useSelector(getEmployeeListsHasMore);
    const isInitialized = useSelector(getEmployeesListIsInitialized);

    useInitialEffect(() => {
        if (!isInitialized) {
            dispatch(initializeEmployeesPage(searchParams));
        }
    });

    const onLoadNextPart = useCallback(() => {
        if (isInitialized && hasMore && !isLoading) {
            dispatch(employeesPageActions.setOffset(limit + offset));
            dispatch(fetchEmployees({ replaceData: false }));
        }
    }, [dispatch, hasMore, isInitialized, isLoading, limit, offset]);

    const onClick = useCallback(
        (id: string | undefined) => {
            if (id) {
                navigate(RoutePath.employee_details + id);
            }
        },
        [navigate],
    );

    return (
        <DynamicModuleLoader
            reducers={initialReducers}
            removeAfterUnmount={false}
        >
            <InfiniteScrollPage onScrollEnd={onLoadNextPart}>
                <Flex vertical gap={16}>
                    <Flex vertical wrap={"wrap"}>
                        {employees.map((employee) => (
                            <EmployeeItem
                                key={employee.id}
                                employee={employee}
                                onClick={onClick}
                            />
                        ))}
                        {isLoading && <div>{"Загрузка..."}</div>}
                        {error && (
                            <Typography.Text type={"danger"}>
                                {error}
                            </Typography.Text>
                        )}
                    </Flex>
                </Flex>
            </InfiniteScrollPage>
        </DynamicModuleLoader>
    );
});
