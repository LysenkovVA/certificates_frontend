import { OrganizationItem } from "@/entities/Organization";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Flex, Typography } from "antd";
import { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import {
    getOrganizationsList,
    getOrganizationsListError,
    getOrganizationsListIsInitialized,
    getOrganizationsListIsLoading,
} from "../model/selectors/organizationsListSelectors";
import { fetchOrganizations } from "../model/services/fetchOrganizations/fetchOrganizations";
import { organizationsReducer } from "../model/slice/organizationsListSlice";

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
    const organizationsIsInited = useSelector(
        getOrganizationsListIsInitialized,
    );

    useEffect(() => {
        if (__PROJECT_ENV__ !== "storybook" && !organizationsIsInited) {
            dispatch(fetchOrganizations({ replaceData: true }));
        }
    }, [dispatch, organizationsIsInited]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Flex vertical>
                {organizations?.map((organization) => (
                    <OrganizationItem
                        key={organization.id}
                        organization={organization}
                    />
                ))}
                {isLoading && <div>{"Загрузка..."}</div>}
                {error && (
                    <Typography.Text type={"danger"}>{error}</Typography.Text>
                )}
            </Flex>
        </DynamicModuleLoader>
    );
});
