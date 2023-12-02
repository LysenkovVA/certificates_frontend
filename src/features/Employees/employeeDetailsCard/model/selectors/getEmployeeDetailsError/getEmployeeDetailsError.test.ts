import { StateSchema } from "@/app/providers/StoreProvider";
import { getEmployeeDetailsError } from "@/features/Employees/employeeDetailsCard/model/selectors/getEmployeeDetailsError/getEmployeeDetailsError";

describe("getEmployeeDetailsError.test", () => {
    test("Should return error", () => {
        const state: DeepPartial<StateSchema> = {
            employeeDetailsSchema: {
                error: "error",
            },
        };

        expect(getEmployeeDetailsError(state as StateSchema)).toEqual("error");
    });

    test("Should return empty error with empty state", () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getEmployeeDetailsError(state as StateSchema)).toEqual("");
    });
});
