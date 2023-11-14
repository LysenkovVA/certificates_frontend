import { StateSchema } from "@/app/providers/StoreProvider";
import { getEmployeeDetails } from "@/entities/Employee/model/selectors/getEmployeeDetails/getEmployeeDetails";

describe("getEmployeeDetails.test", () => {
    test("Should return employee details", () => {
        const data = {
            id: "1",
            surname: "Ivanov",
            name: "Ivan",
        };

        const state: DeepPartial<StateSchema> = {
            employeeDetailsSchema: {
                data,
            },
        };

        expect(getEmployeeDetails(state as StateSchema)).toEqual(data);
    });

    test("Should return 'undefined' details with empty state", () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getEmployeeDetails(state as StateSchema)).toEqual(undefined);
    });
});
