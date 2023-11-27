import { DepartmentCard } from "@/entities/Department";
import {
    getDepartments,
    getDepartmentsError,
    getDepartmentsIsInited,
    getDepartmentsIsLoading,
} from "@/entities/Department/model/selectors/departmentsSelectors";
import { fetchDepartments } from "@/entities/Department/model/services/fetchDepartments/fetchDepartments";
import { departmentsReducer } from "@/entities/Department/model/slice/departmentsSlice";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Flex, Typography } from "antd";
import { memo, useEffect } from "react";
import { useSelector } from "react-redux";

export interface DepartmentsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    departmentsSchema: departmentsReducer,
};

const DepartmentsPage = (props: DepartmentsPageProps) => {
    const { className } = props;

    const dispatch = useAppDispatch();
    const departments = useSelector(getDepartments.selectAll);
    const isLoading = useSelector(getDepartmentsIsLoading);
    const error = useSelector(getDepartmentsError);
    const isInited = useSelector(getDepartmentsIsInited);

    useEffect(() => {
        if (!isInited) {
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
};

export default memo(DepartmentsPage);
