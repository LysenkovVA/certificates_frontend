import { ConstructionObjectItem } from "@/entities/ConstructionObject";
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
    getConstructionObjectsList,
    getConstructionObjectsListError,
    getConstructionObjectsListHasMore,
    getConstructionObjectsListIsInitialized,
    getConstructionObjectsListIsLoading,
    getConstructionObjectsListLimit,
    getConstructionObjectsListOffset,
} from "../model/selectors/constructionObjectsListSelectors";
import { fetchConstructionObjects } from "../model/services/fetchConstructionObjects/fetchConstructionObjects";
import {
    constructionObjectsActions,
    constructionObjectsReducer,
} from "../model/slice/constructionObjectsSlice";

interface ConstructionObjectsListProps {
    className?: string;
}

const reducers: ReducersList = {
    constructionObjectsSchema: constructionObjectsReducer,
};

export const ConstructionObjectsList = memo(
    (props: ConstructionObjectsListProps) => {
        const { className } = props;
        const dispatch = useAppDispatch();
        const constructionObjects = useSelector(
            getConstructionObjectsList.selectAll,
        );
        const isLoading = useSelector(getConstructionObjectsListIsLoading);
        const error = useSelector(getConstructionObjectsListError);
        const limit = useSelector(getConstructionObjectsListLimit);
        const offset = useSelector(getConstructionObjectsListOffset);
        const hasMore = useSelector(getConstructionObjectsListHasMore);
        const isInitialized = useSelector(
            getConstructionObjectsListIsInitialized,
        );

        useInitialEffect(() => {
            if (!isInitialized) {
                dispatch(fetchConstructionObjects({ replaceData: true }));
            }
        });

        const onLoadNextPart = useCallback(() => {
            if (isInitialized && hasMore && !isLoading) {
                dispatch(constructionObjectsActions.setOffset(limit + offset));
                dispatch(fetchConstructionObjects({ replaceData: false }));
            }
        }, [dispatch, hasMore, isInitialized, isLoading, limit, offset]);

        return (
            <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
                <InfiniteScrollPage onScrollEnd={onLoadNextPart}>
                    <Flex vertical gap={8}>
                        {constructionObjects?.map((constructionObject) => (
                            <ConstructionObjectItem
                                key={constructionObject.id}
                                constructionObject={constructionObject}
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
