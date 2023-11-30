import { EmployeesList } from "@/features/Employees/employeesList";
import { getEmployeesListSearchQuery } from "@/features/Employees/employeesList/model/selectors/getEmployeesSearchQuery/getEmployeesSearchQuery";
import { fetchEmployees } from "@/features/Employees/employeesList/model/services/fetchEmployees/fetchEmployees";
import { employeesPageActions } from "@/features/Employees/employeesList/model/slice/employeesPageSlice";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { memo, useCallback } from "react";
import { useSelector } from "react-redux";

export interface EmployeesPageProps {
    className?: string;
}

const EmployeesPage = (props: EmployeesPageProps) => {
    const { className } = props;

    const dispatch = useAppDispatch();
    const searchQuery = useSelector(getEmployeesListSearchQuery);

    const fetchData = useCallback(() => {
        dispatch(fetchEmployees({ replaceData: true }));
    }, [dispatch]);

    const onChange = useCallback(
        (value: string | undefined) => {
            dispatch(employeesPageActions.setSearchQuery(value));
        },
        [dispatch],
    );

    return (
        // <Flex vertical gap={8}>
        //     <SearchBar
        //         currentSearchQuery={searchQuery}
        //         onChangeValue={onChange}
        //         searchCallbackForDebounce={fetchData}
        //     />
        <EmployeesList />
        // {/*</Flex>*/}
    );
};

export default memo(EmployeesPage);
