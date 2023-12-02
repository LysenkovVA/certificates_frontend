import { EmployeesInfiniteList } from "@/features/Employees/employeesList";
import { getEmployeesInfiniteListSearchQuery } from "@/features/Employees/employeesList/model/selectors/getEmployeesInfiniteListSearchQuery/getEmployeesInfiniteListSearchQuery";
import { fetchEmployeesInfiniteList } from "@/features/Employees/employeesList/model/services/fetchEmployeesInfiniteList/fetchEmployeesInfiniteList";
import { employeesInfiniteListActions } from "@/features/Employees/employeesList/model/slice/employeesInfiniteListSlice";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { memo, useCallback } from "react";
import { useSelector } from "react-redux";

export interface EmployeesPageProps {
    className?: string;
}

const EmployeesPage = (props: EmployeesPageProps) => {
    const { className } = props;

    const dispatch = useAppDispatch();
    const searchQuery = useSelector(getEmployeesInfiniteListSearchQuery);

    const fetchData = useCallback(() => {
        dispatch(fetchEmployeesInfiniteList({ replaceData: true }));
    }, [dispatch]);

    const onChange = useCallback(
        (value: string | undefined) => {
            dispatch(employeesInfiniteListActions.setSearchQuery(value));
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
        <EmployeesInfiniteList />
        // {/*</Flex>*/}
    );
};

export default memo(EmployeesPage);
