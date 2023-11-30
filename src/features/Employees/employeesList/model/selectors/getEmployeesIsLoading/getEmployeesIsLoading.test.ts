import { StateSchema } from "@/app/providers/StoreProvider";
import { getEmployeesListIsLoading } from "@/features/Employees/employeesList/model/selectors/getEmployeesIsLoading/getEmployeesIsLoading";

describe("getEmployeesIsLoading.test", () => {
    test("Should return 'true' value", () => {
        const state: DeepPartial<StateSchema> = {
            employeesPageSchema: {
                isLoading: true,
            },
        };

        expect(getEmployeesListIsLoading(state as StateSchema)).toEqual(true);
    });

    test("Should return 'false' value", () => {
        const state: DeepPartial<StateSchema> = {
            employeesPageSchema: {
                isLoading: false,
            },
        };

        expect(getEmployeesListIsLoading(state as StateSchema)).toEqual(false);
    });

    test("Should return 'false' with empty state", () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getEmployeesListIsLoading(state as StateSchema)).toEqual(false);
    });
});
