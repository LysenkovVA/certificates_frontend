import {
    employeesPageActions,
    employeesPageReducer,
} from "@/pages/EmployeesPage/model/slice/employeesPageSlice";
import { EmployeesPageSchema } from "@/pages/EmployeesPage/model/types/EmployeesPageSchema";

describe("employeePageSlice.test", () => {
    test("Should set initialized", () => {
        const state: DeepPartial<EmployeesPageSchema> = {
            _isInitialized: false,
        };
        expect(
            employeesPageReducer(
                state as EmployeesPageSchema,
                employeesPageActions.initializeState(),
            ),
        ).toEqual({ _isInitialized: true });
    });

    test("Should set limit", () => {
        const state: DeepPartial<EmployeesPageSchema> = {
            limit: 10,
        };

        expect(
            employeesPageReducer(
                state as EmployeesPageSchema,
                employeesPageActions.setLimit(5),
            ),
        ).toEqual({ limit: 5 });
    });

    test("Should set offset", () => {
        const state: DeepPartial<EmployeesPageSchema> = {
            offset: 0,
        };

        expect(
            employeesPageReducer(
                state as EmployeesPageSchema,
                employeesPageActions.setOffset(10),
            ),
        ).toEqual({ offset: 10 });
    });

    test("Should set search query", () => {
        const state: DeepPartial<EmployeesPageSchema> = {
            searchQuery: "",
            offset: 10,
        };

        expect(
            employeesPageReducer(
                state as EmployeesPageSchema,
                employeesPageActions.setSearchQuery("search"),
            ),
        ).toEqual({ searchQuery: "search", offset: 0 });
    });
});
