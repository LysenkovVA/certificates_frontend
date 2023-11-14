import { StateSchema } from "@/app/providers/StoreProvider";
import { getEmployeesSearchQuery } from "@/pages/EmployeesPage/model/selectors/getEmployeesSearchQuery/getEmployeesSearchQuery";

describe("getEmployeesSearchQuery.test", () => {
    test("Should return value", () => {
        const state: DeepPartial<StateSchema> = {
            employeesPageSchema: {
                searchQuery: "search",
            },
        };

        expect(getEmployeesSearchQuery(state as StateSchema)).toEqual("search");
    });

    test("Should return empty string for undefined", () => {
        const state: DeepPartial<StateSchema> = {
            employeesPageSchema: {
                searchQuery: undefined,
            },
        };

        expect(getEmployeesSearchQuery(state as StateSchema)).toEqual("");
    });

    test("Should return empty string for empty state", () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getEmployeesSearchQuery(state as StateSchema)).toEqual("");
    });
});
