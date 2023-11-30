import { DepartmentCard } from "@/entities/Department";
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
    getDepartmentsList,
    getDepartmentsListError,
    getDepartmentsListHasMore,
    getDepartmentsListIsInitialized,
    getDepartmentsListIsLoading,
    getDepartmentsListLimit,
    getDepartmentsListOffset,
} from "../model/selectors/departmentsListSelectors";
import { fetchDepartments } from "../model/services/fetchDepartments/fetchDepartments";
import {
    departmentsActions,
    departmentsReducer,
} from "../model/slice/departmentsSlice";

interface DepartmentsListProps {
    className?: string;
}

const reducers: ReducersList = {
    departmentsSchema: departmentsReducer,
};

export const DepartmentsList = memo((props: DepartmentsListProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const departments = useSelector(getDepartmentsList.selectAll);
    const isLoading = useSelector(getDepartmentsListIsLoading);
    const error = useSelector(getDepartmentsListError);
    const limit = useSelector(getDepartmentsListLimit);
    const offset = useSelector(getDepartmentsListOffset);
    const hasMore = useSelector(getDepartmentsListHasMore);
    const isInitialized = useSelector(getDepartmentsListIsInitialized);

    useInitialEffect(() => {
        if (!isInitialized) {
            dispatch(fetchDepartments({ replaceData: true }));
        }
    });

    const onLoadNextPart = useCallback(() => {
        if (isInitialized && hasMore) {
            dispatch(departmentsActions.setOffset(limit + offset));
            dispatch(fetchDepartments({ replaceData: false }));
        }
    }, [dispatch, hasMore, isInitialized, limit, offset]);

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
});
