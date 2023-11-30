import { StateSchema } from "@/app/providers/StoreProvider";
import { getEmployeesListSearchQuery } from "@/features/Employees/employeesList/model/selectors/getEmployeesSearchQuery/getEmployeesSearchQuery";

describe("getEmployeesSearchQuery.test", () => {
    test("Should return value", () => {
        const state: DeepPartial<StateSchema> = {
            employeesPageSchema: {
                searchQuery: "search",
            },
        };

        expect(getEmployeesListSearchQuery(state as StateSchema)).toEqual(
            "search",
        );
    });

    test("Should return empty string for undefined", () => {
        const state: DeepPartial<StateSchema> = {
            employeesPageSchema: {
                searchQuery: undefined,
            },
        };

        expect(getEmployeesListSearchQuery(state as StateSchema)).toEqual("");
    });

    test("Should return empty string for empty state", () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getEmployeesListSearchQuery(state as StateSchema)).toEqual("");
    });
});
