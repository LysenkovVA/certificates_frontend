import { StateSchema } from "@/app/providers/StoreProvider";
import { getEmployeesIsInitialized } from "@/pages/EmployeesPage/model/selectors/getEmployeesIsInitialized/getEmployeesIsInitialized";

describe("getEmployeesInitialized.test", () => {
    test("Should return 'true' value", () => {
        const state: DeepPartial<StateSchema> = {
            employeesPageSchema: {
                _isInitialized: true,
            },
        };

        expect(getEmployeesIsInitialized(state as StateSchema)).toEqual(true);
    });

    test("Should return 'false' value", () => {
        const state: DeepPartial<StateSchema> = {
            employeesPageSchema: {
                _isInitialized: false,
            },
        };

        expect(getEmployeesIsInitialized(state as StateSchema)).toEqual(false);
    });

    test("Should return 'false' with empty state", () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getEmployeesIsInitialized(state as StateSchema)).toEqual(false);
    });
});
