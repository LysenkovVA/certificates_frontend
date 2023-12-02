import { ConstructionObjectItem } from "@/entities/ConstructionObject";
import { fetchConstructionObjectsInfiniteList } from "@/features/ConstructionObjects/constructionObjectsList/model/services/fetchConstructionObjectsInfiniteList/fetchConstructionObjectsInfiniteList";
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
    getConstructionObjectsInfiniteList,
    getConstructionObjectsInfiniteListError,
    getConstructionObjectsInfiniteListHasMore,
    getConstructionObjectsInfiniteListIsInitialized,
    getConstructionObjectsInfiniteListIsLoading,
    getConstructionObjectsInfiniteListLimit,
    getConstructionObjectsInfiniteListOffset,
} from "../model/selectors/constructionObjectsInfiniteListSelectors";
import {
    constructionObjectsInfiniteListActions,
    constructionObjectsInfiniteListReducer,
} from "../model/slice/constructionObjectsInfiniteListSlice";

interface ConstructionObjectsInfiniteListProps {
    className?: string;
}

const reducers: ReducersList = {
    constructionObjectsInfiniteListSchema:
        constructionObjectsInfiniteListReducer,
};

export const ConstructionObjectsInfiniteList = memo(
    (props: ConstructionObjectsInfiniteListProps) => {
        const { className } = props;
        const dispatch = useAppDispatch();
        const constructionObjects = useSelector(
            getConstructionObjectsInfiniteList.selectAll,
        );
        const isLoading = useSelector(
            getConstructionObjectsInfiniteListIsLoading,
        );
        const error = useSelector(getConstructionObjectsInfiniteListError);
        const limit = useSelector(getConstructionObjectsInfiniteListLimit);
        const offset = useSelector(getConstructionObjectsInfiniteListOffset);
        const hasMore = useSelector(getConstructionObjectsInfiniteListHasMore);
        const isInitialized = useSelector(
            getConstructionObjectsInfiniteListIsInitialized,
        );

        useInitialEffect(() => {
            if (!isInitialized) {
                dispatch(
                    fetchConstructionObjectsInfiniteList({ replaceData: true }),
                );
            }
        });

        const onLoadNextPart = useCallback(() => {
            if (isInitialized && hasMore && !isLoading) {
                dispatch(
                    constructionObjectsInfiniteListActions.setOffset(
                        limit + offset,
                    ),
                );
                dispatch(
                    fetchConstructionObjectsInfiniteList({
                        replaceData: false,
                    }),
                );
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
