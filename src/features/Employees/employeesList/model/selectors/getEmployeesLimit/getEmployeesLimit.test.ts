import { StateSchema } from "@/app/providers/StoreProvider";
import { getEmployeesListLimit } from "@/features/Employees/employeesList/model/selectors/getEmployeesLimit/getEmployeesLimit";

describe("getEmployeesLimit.test", () => {
    test("Should return value", () => {
        const state: DeepPartial<StateSchema> = {
            employeesPageSchema: {
                limit: 10,
            },
        };

        expect(getEmployeesListLimit(state as StateSchema)).toEqual(10);
    });

    test("Should return default limit value for empty state", () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getEmployeesListLimit(state as StateSchema)).toEqual(10);
    });
});
