import { StateSchema } from "@/app/providers/StoreProvider";
import { getEmployeesLimit } from "@/pages/EmployeesPage/model/selectors/getEmployeesLimit/getEmployeesLimit";

describe("getEmployeesLimit.test", () => {
    test("Should return value", () => {
        const state: DeepPartial<StateSchema> = {
            employeesPageSchema: {
                limit: 10,
            },
        };

        expect(getEmployeesLimit(state as StateSchema)).toEqual(10);
    });

    test("Should return default limit value for empty state", () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getEmployeesLimit(state as StateSchema)).toEqual(10);
    });
});
