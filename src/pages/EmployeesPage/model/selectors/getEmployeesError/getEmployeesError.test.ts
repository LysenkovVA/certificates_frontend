import { StateSchema } from "@/app/providers/StoreProvider";
import { getEmployeesError } from "@/pages/EmployeesPage/model/selectors/getEmployeesError/getEmployeesError";

describe("getEmployeesError.test", () => {
    test("Should return error", () => {
        const state: DeepPartial<StateSchema> = {
            employeesPageSchema: {
                error: "error",
            },
        };

        expect(getEmployeesError(state as StateSchema)).toEqual("error");
    });

    test("Should return empty string with empty state", () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getEmployeesError(state as StateSchema)).toEqual("");
    });
});
