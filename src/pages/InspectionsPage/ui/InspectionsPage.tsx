import {
    getOrganizations,
    getOrganizationsError,
    getOrganizationsIsLoading,
} from "@/entities/Organization/model/selectors/organizationsSelectors";
import { fetchOrganizations } from "@/entities/Organization/model/services/fetchOrganizations/fetchOrganizations";
import { organizationsReducer } from "@/entities/Organization/model/slice/organization.slice";
import { classNames } from "@/shared/lib/classNames/classNames";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { SelectField } from "@/shared/ui/SelectField/SelectField";
import { Flex, Typography } from "antd";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import cls from "./InspectionsPage.module.scss";

export interface InspectionsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    organizationsSchema: organizationsReducer,
};

const InspectionsPage = (props: InspectionsPageProps) => {
    const { className } = props;

    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log("Fetching organizations...");
        dispatch(fetchOrganizations({ replaceData: true }));
    }, [dispatch]);

    const isLoading = useSelector(getOrganizationsIsLoading);
    const error = useSelector(getOrganizationsError);
    const organizations = useSelector(getOrganizations.selectAll);

    const [organization, setOrganization] = useState<string>();

    console.log("org " + organization);

    const onChange = useCallback(
        (value: string) => {
            console.log("Change: " + value);
            setOrganization(value);
        },
        [setOrganization],
    );

    const mapToList = useMemo(() => {
        return organizations.map((value) => {
            return { id: value.id, label: value.name };
        });
    }, [organizations]);

    return (
        <div className={classNames(cls.InspectionsPage, {}, [className])}>
            <Typography.Title level={1}>{"Проверки"}</Typography.Title>
            <Flex justify={"center"} align={"center"}>
                <DynamicModuleLoader reducers={reducers}>
                    <SelectField
                        options={mapToList}
                        value={organization!}
                        onChange={onChange}
                    />
                </DynamicModuleLoader>
                {isLoading && (
                    <Typography.Text type={"secondary"}>
                        {"Loading..."}
                    </Typography.Text>
                )}
                {error && (
                    <Typography.Text type={"danger"}>{error}</Typography.Text>
                )}
            </Flex>
        </div>
    );
};

export default memo(InspectionsPage);
