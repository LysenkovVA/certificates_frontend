import { StateSchema } from "@/app/providers/StoreProvider";
import { getEmployeesHasMore } from "@/pages/EmployeesPage/model/selectors/getEmployeesHasMore/getEmployeesHasMore";

describe("getEmployeesHasMore.test", () => {
    test("Should return 'true' value", () => {
        const state: DeepPartial<StateSchema> = {
            employeesPageSchema: {
                hasMore: true,
            },
        };

        expect(getEmployeesHasMore(state as StateSchema)).toEqual(true);
    });

    test("Should return 'false' value", () => {
        const state: DeepPartial<StateSchema> = {
            employeesPageSchema: {
                hasMore: false,
            },
        };

        expect(getEmployeesHasMore(state as StateSchema)).toEqual(false);
    });

    test("Should return 'false' with empty state", () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getEmployeesHasMore(state as StateSchema)).toEqual(false);
    });
});
