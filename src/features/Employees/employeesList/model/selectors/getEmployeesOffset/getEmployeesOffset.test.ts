import { StateSchema } from "@/app/providers/StoreProvider";
import { getEmployeesOffset } from "@/pages/EmployeesPage/model/selectors/getEmployeesOffset/getEmployeesOffset";

describe("getEmployeesOffset.test", () => {
    test("Should return value", () => {
        const state: DeepPartial<StateSchema> = {
            employeesPageSchema: {
                offset: 10,
            },
        };

        expect(getEmployeesOffset(state as StateSchema)).toEqual(10);
    });

    test("Should return default offset (0) for empty state", () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getEmployeesOffset(state as StateSchema)).toEqual(0);
    });
});
