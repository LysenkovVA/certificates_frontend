import { StateSchema } from "@/app/providers/StoreProvider";
import { getEmployeesListError } from "@/features/Employees/employeesList/model/selectors/getEmployeesError/getEmployeesError";

describe("getEmployeesError.test", () => {
    test("Should return error", () => {
        const state: DeepPartial<StateSchema> = {
            employeesPageSchema: {
                error: "error",
            },
        };

        expect(getEmployeesListError(state as StateSchema)).toEqual("error");
    });

    test("Should return empty string with empty state", () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getEmployeesListError(state as StateSchema)).toEqual("");
    });
});
