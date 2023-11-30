import { InspectionItem } from "@/entities/Inspection";
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
    getInspectionListOffset,
    getInspectionsList,
    getInspectionsListError,
    getInspectionsListHasMore,
    getInspectionsListIsInitialized,
    getInspectionsListIsLoading,
    getInspectionsListLimit,
} from "../model/selectors/inspectionsListSelectors";
import { fetchInspections } from "../model/services/fetchInspections/fetchInspections";
import {
    inspectionsActions,
    inspectionsReducer,
} from "../model/slice/inspectionsListSlice";

interface InspectionsListProps {
    className?: string;
}

const reducers: ReducersList = {
    inspectionsSchema: inspectionsReducer,
};

export const InspectionsList = memo((props: InspectionsListProps) => {
    const { className } = props;

    const dispatch = useAppDispatch();

    const inspections = useSelector(getInspectionsList.selectAll);
    const isLoading = useSelector(getInspectionsListIsLoading);
    const limit = useSelector(getInspectionsListLimit);
    const offset = useSelector(getInspectionListOffset);
    const error = useSelector(getInspectionsListError);
    const hasMore = useSelector(getInspectionsListHasMore);
    const isInitialized = useSelector(getInspectionsListIsInitialized);

    useInitialEffect(() => {
        if (!isInitialized) {
            dispatch(fetchInspections({ replaceData: true }));
        }
    });

    const onLoadNextPart = useCallback(() => {
        if (isInitialized && hasMore && !isLoading) {
            dispatch(inspectionsActions.setOffset(limit + offset));
            dispatch(fetchInspections({ replaceData: false }));
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
});
