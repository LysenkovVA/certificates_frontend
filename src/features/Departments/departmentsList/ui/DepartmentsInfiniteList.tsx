import { DepartmentCard } from "@/entities/Department";
import { fetchDepartmentsInfiniteList } from "@/features/Departments/departmentsList/model/services/fetchDepartmentsInfiniteList/fetchDepartmentsInfiniteList";
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
import {
    getDepartmentsInfiniteList,
    getDepartmentsInfiniteListError,
    getDepartmentsInfiniteListHasMore,
    getDepartmentsInfiniteListIsInitialized,
    getDepartmentsInfiniteListIsLoading,
    getDepartmentsInfiniteListLimit,
    getDepartmentsInfiniteListOffset,
} from "../model/selectors/departmentsInfiniteListSelectors";
import {
    departmentsInfiniteListActions,
    departmentsInfiniteListReducer,
} from "../model/slice/departmentsInfiniteListSlice";

interface DepartmentsInfiniteListProps {
    className?: string;
}

const reducers: ReducersList = {
    departmentsInfiniteListSchema: departmentsInfiniteListReducer,
};

export const DepartmentsInfiniteList = memo(
    (props: DepartmentsInfiniteListProps) => {
        const { className } = props;
        const dispatch = useAppDispatch();
        const departments = useSelector(getDepartmentsInfiniteList.selectAll);
        const isLoading = useSelector(getDepartmentsInfiniteListIsLoading);
        const error = useSelector(getDepartmentsInfiniteListError);
        const limit = useSelector(getDepartmentsInfiniteListLimit);
        const offset = useSelector(getDepartmentsInfiniteListOffset);
        const hasMore = useSelector(getDepartmentsInfiniteListHasMore);
        const isInitialized = useSelector(
            getDepartmentsInfiniteListIsInitialized,
        );

        useInitialEffect(() => {
            if (!isInitialized) {
                dispatch(fetchDepartmentsInfiniteList({ replaceData: true }));
            }
        });

        const onLoadNextPart = useCallback(() => {
            if (isInitialized && hasMore && !isLoading) {
                dispatch(
                    departmentsInfiniteListActions.setOffset(limit + offset),
                );
                dispatch(fetchDepartmentsInfiniteList({ replaceData: false }));
            }
        }, [dispatch, hasMore, isInitialized, isLoading, limit, offset]);

        return (
            <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
                <InfiniteScrollPage onScrollEnd={onLoadNextPart}>
                    <Flex vertical gap={8}>
                        {departments?.map((department) => (
                            <DepartmentCard
                                key={department.id}
                                department={department}
                            />
                        ))}
                        {isLoading && <div>{"Загрузка..."}</div>}
                        {error && (
                            <Typography.Text type={"danger"}>
                                {error}
                            </Typography.Text>
                        )}
                    </Flex>
                </InfiniteScrollPage>
            </DynamicModuleLoader>
        );
    },
);
