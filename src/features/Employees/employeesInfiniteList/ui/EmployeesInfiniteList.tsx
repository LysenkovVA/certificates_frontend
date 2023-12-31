import { EmployeeItem } from "@/entities/Employee";
import { getEmployeesInfiniteList } from "@/features/Employees/employeesInfiniteList/model/selectors/getEmployeesInfiniteList/getEmployeesInfiniteList";
import { getEmployeesInfiniteListError } from "@/features/Employees/employeesInfiniteList/model/selectors/getEmployeesInfiniteListError/getEmployeesInfiniteListError";
import { getEmployeesInfiniteListIsInitialized } from "@/features/Employees/employeesInfiniteList/model/selectors/getEmployeesInfiniteListIsInitialized/getEmployeesInfiniteListIsInitialized";
import { getEmployeesInfiniteListIsLoading } from "@/features/Employees/employeesInfiniteList/model/selectors/getEmployeesInfiniteListIsLoading/getEmployeesInfiniteListIsLoading";
import { getEmployeesInfiniteListLimit } from "@/features/Employees/employeesInfiniteList/model/selectors/getEmployeesInfiniteListLimit/getEmployeesInfiniteListLimit";
import { getEmployeesInfiniteListOffset } from "@/features/Employees/employeesInfiniteList/model/selectors/getEmployeesInfiniteListOffset/getEmployeesInfiniteListOffset";
import { fetchEmployeesInfiniteList } from "@/features/Employees/employeesInfiniteList/model/services/fetchEmployeesInfiniteList/fetchEmployeesInfiniteList";
import { initializeEmployeesInfiniteList } from "@/features/Employees/employeesInfiniteList/model/services/initializeEmployeesInfiniteList/initializeEmployeesInfiniteList";
import { RoutePath } from "@/shared/config/routeConfig/routeConfig";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";
import { InfiniteScrollPage } from "@/widgets/InfiniteScrollPage";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Col, Flex, FloatButton, Row, Typography } from "antd";
import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getEmployeeListsHasMore } from "../model/selectors/getEmployeesHasMore/getEmployeesHasMore";
import {
    employeesInfiniteListActions,
    employeesInfiniteListReducer,
} from "../model/slice/employeesInfiniteListSlice";

interface EmployeesInfiniteListProps {
    className?: string;
}

const initialReducers: ReducersList = {
    employeesInfiniteListSchema: employeesInfiniteListReducer,
};

export const EmployeesInfiniteList = memo(
    (props: EmployeesInfiniteListProps) => {
        const { className } = props;

        // Получаем параметры из строки запроса
        const [searchParams] = useSearchParams();
        const navigate = useNavigate();

        const dispatch = useAppDispatch();

        const employees = useSelector(getEmployeesInfiniteList.selectAll);
        const isLoading = useSelector(getEmployeesInfiniteListIsLoading);
        const error = useSelector(getEmployeesInfiniteListError);
        const limit = useSelector(getEmployeesInfiniteListLimit);
        const offset = useSelector(getEmployeesInfiniteListOffset);
        const hasMore = useSelector(getEmployeeListsHasMore);
        const isInitialized = useSelector(
            getEmployeesInfiniteListIsInitialized,
        );

        useInitialEffect(() => {
            if (!isInitialized) {
                dispatch(initializeEmployeesInfiniteList(searchParams));
            }
        });

        const onLoadNextPart = useCallback(() => {
            if (isInitialized && hasMore && !isLoading) {
                dispatch(
                    employeesInfiniteListActions.setOffset(limit + offset),
                );
                dispatch(fetchEmployeesInfiniteList({ replaceData: false }));
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

        const content = (
            <Row gutter={[0, 0]}>
                {employees.map((employee, index) => (
                    <Col key={index} span={24 / 4}>
                        <EmployeeItem
                            key={employee.id}
                            employee={employee}
                            onClick={onClick}
                        />
                    </Col>
                ))}
            </Row>
        );

        // const ref = useRef<HTMLDivElement>(null);

        return (
            <DynamicModuleLoader
                reducers={initialReducers}
                removeAfterUnmount={false}
            >
                <InfiniteScrollPage onScrollEnd={onLoadNextPart}>
                    <Flex vertical gap={8}>
                        {content}
                        {isLoading && <div>{"Загрузка..."}</div>}
                        {error && (
                            <Typography.Text type={"danger"}>
                                {error}
                            </Typography.Text>
                        )}
                    </Flex>
                </InfiniteScrollPage>
                <FloatButton
                    icon={<PlusCircleOutlined />}
                    // description={"ADD"}
                    shape={"circle"}
                    type={"primary"}
                    style={{ bottom: 50, right: 50, width: 50, height: 50 }}
                    onClick={() => navigate(RoutePath.create_employee)}
                />
            </DynamicModuleLoader>
        );
    },
);
