import { InspectionItem } from "@/entities/Inspection";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Button, Flex, Typography } from "antd";
import { memo, useCallback, useEffect } from "react";
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

    useEffect(() => {
        if (__PROJECT_ENV__ !== "storybook" && !isInitialized) {
            dispatch(fetchInspections({ replaceData: true }));
        }
    }, [dispatch, isInitialized]);

    const onLoadNextPart = useCallback(() => {
        if (hasMore) {
            dispatch(inspectionsActions.setOffset(limit + offset));
            dispatch(fetchInspections({ replaceData: false }));
        }
    }, [dispatch, hasMore, limit, offset]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Flex vertical gap={8}>
                {inspections?.map((inspection) => (
                    <InspectionItem
                        key={inspection.id}
                        inspection={inspection}
                    />
                ))}
                {isLoading && <div>{"Загрузка данных..."}</div>}
                {error && (
                    <Typography.Text type={"danger"}>{error}</Typography.Text>
                )}
                <Button disabled={!hasMore} onClick={onLoadNextPart}>
                    Load next part
                </Button>
            </Flex>
        </DynamicModuleLoader>
    );
});
