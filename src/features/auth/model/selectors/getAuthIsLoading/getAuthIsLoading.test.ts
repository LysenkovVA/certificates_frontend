import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";
import { getAuthIsLoading } from "./getAuthIsLoading";

describe("getAuthIsLoading.test", () => {
    test("Should return true", () => {
        const state: DeepPartial<StateSchema> = {
            auth: {
                isLoading: true,
            },
        };
        expect(getAuthIsLoading(state as StateSchema)).toEqual(true);
    });
    test("Should return false", () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getAuthIsLoading(state as StateSchema)).toEqual(false);
    });
});
