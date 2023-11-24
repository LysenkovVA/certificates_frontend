import { OrganizationCard } from "@/entities/Organization";
import {
    getOrganizations,
    getOrganizationsError,
    getOrganizationsIsInited,
    getOrganizationsIsLoading,
} from "@/entities/Organization/model/selectors/organizationsSelectors";
import { fetchOrganizations } from "@/entities/Organization/model/services/fetchOrganizations/fetchOrganizations";
import { organizationsReducer } from "@/entities/Organization/model/slice/organization.slice";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Flex, Typography } from "antd";
import { memo, useEffect } from "react";
import { useSelector } from "react-redux";

interface OrganizationsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    organizationsSchema: organizationsReducer,
};

const OrganizationsPage = (props: OrganizationsPageProps) => {
    const { className } = props;

    const dispatch = useAppDispatch();
    const organizations = useSelector(getOrganizations.selectAll);
    const isLoading = useSelector(getOrganizationsIsLoading);
    const error = useSelector(getOrganizationsError);
    const organizationsIsInited = useSelector(getOrganizationsIsInited);

    useEffect(() => {
        if (!organizationsIsInited) {
            dispatch(fetchOrganizations({ replaceData: true }));
        }
    }, [dispatch, organizationsIsInited]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <Flex vertical>
                {organizations?.map((organization) => (
                    <OrganizationCard
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
};

export default memo(OrganizationsPage);
