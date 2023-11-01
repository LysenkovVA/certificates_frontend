import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";
import { getAuthenticatedUserId } from "./getAuthenticatedUserId";

describe("getAuthenticatedUserId.test", () => {
    test("Should return value", () => {
        const state: DeepPartial<StateSchema> = {
            user: {
                authenticatedUser: {
                    id: "1",
                },
            },
        };
        expect(getAuthenticatedUserId(state as StateSchema)).toEqual("1");
    });
});
