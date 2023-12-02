import { OrganizationItem } from "@/entities/Organization";
import { fetchOrganizationsInfiniteList } from "@/features/Organizations/organizationsList/model/services/fetchOrganizationsInfiniteList/fetchOrganizationsInfiniteList";
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
    getOrganizationsInfiniteList,
    getOrganizationsInfiniteListError,
    getOrganizationsInfiniteListHasMore,
    getOrganizationsInfiniteListIsInitialized,
    getOrganizationsInfiniteListIsLoading,
    getOrganizationsInfiniteListLimit,
    getOrganizationsInfiniteListOffset,
} from "../model/selectors/organizationsInfiniteListSelectors";
import {
    organizationsInfiniteListActions,
    organizationsInfiniteListReducer,
} from "../model/slice/organizationsInfiniteListSlice";

interface OrganizationsInfiniteListProps {
    className?: string;
}
const reducers: ReducersList = {
    organizationsInfiniteListSchema: organizationsInfiniteListReducer,
};

export const OrganizationsInfiniteList = memo(
    (props: OrganizationsInfiniteListProps) => {
        const { className } = props;
        const dispatch = useAppDispatch();
        const organizations = useSelector(
            getOrganizationsInfiniteList.selectAll,
        );
        const isLoading = useSelector(getOrganizationsInfiniteListIsLoading);
        const error = useSelector(getOrganizationsInfiniteListError);
        const limit = useSelector(getOrganizationsInfiniteListLimit);
        const offset = useSelector(getOrganizationsInfiniteListOffset);
        const hasMore = useSelector(getOrganizationsInfiniteListHasMore);
        const isInitialized = useSelector(
            getOrganizationsInfiniteListIsInitialized,
        );

        useInitialEffect(() => {
            if (!isInitialized) {
                dispatch(fetchOrganizationsInfiniteList({ replaceData: true }));
            }
        });

        const onLoadNextPart = useCallback(() => {
            if (isInitialized && hasMore && !isLoading) {
                dispatch(
                    organizationsInfiniteListActions.setOffset(limit + offset),
                );
                dispatch(
                    fetchOrganizationsInfiniteList({ replaceData: false }),
                );
            }
        }, [dispatch, hasMore, isInitialized, isLoading, limit, offset]);

        return (
            <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
                <InfiniteScrollPage onScrollEnd={onLoadNextPart}>
                    <Flex vertical>
                        {organizations?.map((organization) => (
                            <OrganizationItem
                                key={organization.id}
                                organization={organization}
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
