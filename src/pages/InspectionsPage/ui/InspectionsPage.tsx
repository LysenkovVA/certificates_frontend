import { InspectionCard } from "@/entities/Inspection";
import {
    getInspections,
    getInspectionsError,
    getInspectionsIsInited,
    getInspectionsIsLoading,
} from "@/entities/Inspection/model/selectors/inspectionsSelectors";
import { fetchInspections } from "@/entities/Inspection/model/services/fetchInspections/fetchInspections";
import { inspectionsReducer } from "@/entities/Inspection/model/slice/inspectionsSlice";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Flex, Typography } from "antd";
import { memo, useEffect } from "react";
import { useSelector } from "react-redux";

export interface InspectionsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    inspectionsSchema: inspectionsReducer,
};

const InspectionsPage = (props: InspectionsPageProps) => {
    const { className } = props;

    const dispatch = useAppDispatch();
    const inspections = useSelector(getInspections.selectAll);
    const isLoading = useSelector(getInspectionsIsLoading);
    const error = useSelector(getInspectionsError);
    const isInited = useSelector(getInspectionsIsInited);

    useEffect(() => {
        if (!isInited) {
            dispatch(fetchInspections({ replaceData: true }));
        }
    }, [dispatch, isInited]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Flex vertical gap={8}>
                {inspections?.map((inspection) => (
                    <InspectionCard
                        key={inspection.id}
                        inspection={inspection}
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

export default memo(InspectionsPage);
