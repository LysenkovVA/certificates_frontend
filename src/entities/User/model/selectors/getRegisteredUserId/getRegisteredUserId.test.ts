import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";
import { getRegisteredUserId } from "@/entities/User";

describe("getRegisteredUserId.test", () => {
    test("Should return value", () => {
        const state: DeepPartial<StateSchema> = {
            user: {
                registeredUserId: "1",
            },
        };
        expect(getRegisteredUserId(state as StateSchema)).toEqual("1");
    });
});
