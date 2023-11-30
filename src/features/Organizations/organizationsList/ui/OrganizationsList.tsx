import { OrganizationItem } from "@/entities/Organization";
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
    getOrganizationsList,
    getOrganizationsListError,
    getOrganizationsListHasMore,
    getOrganizationsListIsInitialized,
    getOrganizationsListIsLoading,
    getOrganizationsListLimit,
    getOrganizationsListOffset,
} from "../model/selectors/organizationsListSelectors";
import { fetchOrganizations } from "../model/services/fetchOrganizations/fetchOrganizations";
import {
    organizationsActions,
    organizationsReducer,
} from "../model/slice/organizationsListSlice";

interface OrganizationsListProps {
    className?: string;
}
const reducers: ReducersList = {
    organizationsSchema: organizationsReducer,
};

export const OrganizationsList = memo((props: OrganizationsListProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const organizations = useSelector(getOrganizationsList.selectAll);
    const isLoading = useSelector(getOrganizationsListIsLoading);
    const error = useSelector(getOrganizationsListError);
    const limit = useSelector(getOrganizationsListLimit);
    const offset = useSelector(getOrganizationsListOffset);
    const hasMore = useSelector(getOrganizationsListHasMore);
    const isInitialized = useSelector(getOrganizationsListIsInitialized);

    useInitialEffect(() => {
        if (!isInitialized) {
            dispatch(fetchOrganizations({ replaceData: true }));
        }
    });

    const onLoadNextPart = useCallback(() => {
        if (isInitialized && hasMore && !isLoading) {
            dispatch(organizationsActions.setOffset(limit + offset));
            dispatch(fetchOrganizations({ replaceData: false }));
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
});
