import { InspectionItem } from "@/entities/Inspection";
import { fetchInspectionsInfiniteList } from "@/features/Inspections/inspectionsInfiniteList/model/services/fetchInspectionsInfiniteList/fetchInspectionsInfiniteList";
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
    getInspectionInfiniteListOffset,
    getInspectionsInfiniteList,
    getInspectionsInfiniteListError,
    getInspectionsInfiniteListHasMore,
    getInspectionsInfiniteListIsInitialized,
    getInspectionsInfiniteListIsLoading,
    getInspectionsInfiniteListLimit,
} from "../model/selectors/inspectionsInfiniteListSelectors";
import {
    inspectionsInfiniteListActions,
    inspectionsInfiniteListReducer,
} from "../model/slice/inspectionsInfiniteListSlice";

interface InspectionsInfiniteListProps {
    className?: string;
}

const reducers: ReducersList = {
    inspectionsInfiniteListSchema: inspectionsInfiniteListReducer,
};

export const InspectionsInfiniteList = memo(
    (props: InspectionsInfiniteListProps) => {
        const { className } = props;

        const dispatch = useAppDispatch();

        const inspections = useSelector(getInspectionsInfiniteList.selectAll);
        const isLoading = useSelector(getInspectionsInfiniteListIsLoading);
        const limit = useSelector(getInspectionsInfiniteListLimit);
        const offset = useSelector(getInspectionInfiniteListOffset);
        const error = useSelector(getInspectionsInfiniteListError);
        const hasMore = useSelector(getInspectionsInfiniteListHasMore);
        const isInitialized = useSelector(
            getInspectionsInfiniteListIsInitialized,
        );

        useInitialEffect(() => {
            if (!isInitialized) {
                dispatch(fetchInspectionsInfiniteList({ replaceData: true }));
            }
        });

        const onLoadNextPart = useCallback(() => {
            if (isInitialized && hasMore && !isLoading) {
                dispatch(
                    inspectionsInfiniteListActions.setOffset(limit + offset),
                );
                dispatch(fetchInspectionsInfiniteList({ replaceData: false }));
            }
        }, [dispatch, hasMore, isInitialized, isLoading, limit, offset]);

        return (
            <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
                <InfiniteScrollPage onScrollEnd={onLoadNextPart}>
                    <Flex vertical gap={8}>
                        {inspections?.map((inspection) => (
                            <InspectionItem
                                key={inspection.id}
                                inspection={inspection}
                            />
                        ))}
                        {isLoading && <div>{"Загрузка данных..."}</div>}
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
