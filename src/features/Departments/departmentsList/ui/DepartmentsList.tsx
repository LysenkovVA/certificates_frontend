import { DepartmentCard } from "@/entities/Department";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Flex, Typography } from "antd";
import { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import {
    getDepartmentsList,
    getDepartmentsListError,
    getDepartmentsListIsInitialized,
    getDepartmentsListIsLoading,
} from "../model/selectors/departmentsListSelectors";
import { fetchDepartments } from "../model/services/fetchDepartments/fetchDepartments";
import { departmentsReducer } from "../model/slice/departmentsSlice";

interface DepartmentsListProps {
    className?: string;
}

const reducers: ReducersList = {
    departmentsSchema: departmentsReducer,
};

export const DepartmentsList = memo((props: DepartmentsListProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const departments = useSelector(getDepartmentsList.selectAll);
    const isLoading = useSelector(getDepartmentsListIsLoading);
    const error = useSelector(getDepartmentsListError);
    const isInited = useSelector(getDepartmentsListIsInitialized);

    useEffect(() => {
        if (__PROJECT_ENV__ !== "storybook" && !isInited) {
            dispatch(fetchDepartments({ replaceData: true }));
        }
    }, [dispatch, isInited]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Flex vertical gap={8}>
                {departments?.map((department) => (
                    <DepartmentCard
                        key={department.id}
                        department={department}
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
