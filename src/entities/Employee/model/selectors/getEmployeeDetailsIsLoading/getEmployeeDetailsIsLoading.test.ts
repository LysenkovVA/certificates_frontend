import { StateSchema } from "@/app/providers/StoreProvider";
import { getEmployeeDetailsIsLoading } from "@/entities/Employee/model/selectors/getEmployeeDetailsIsLoading/getEmployeeDetailsIsLoading";

describe("getEmployeeDetailsIsLoading.test", () => {
    test("Should return 'true' value", () => {
        const state: DeepPartial<StateSchema> = {
            employeeDetailsSchema: {
                isLoading: true,
            },
        };

        expect(getEmployeeDetailsIsLoading(state as StateSchema)).toEqual(true);
    });

    test("Should return 'false' value", () => {
        const state: DeepPartial<StateSchema> = {
            employeeDetailsSchema: {
                isLoading: false,
            },
        };

        expect(getEmployeeDetailsIsLoading(state as StateSchema)).toEqual(
            false,
        );
    });

    test("Should return 'false' value with empty state", () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getEmployeeDetailsIsLoading(state as StateSchema)).toEqual(
            false,
        );
    });
});
