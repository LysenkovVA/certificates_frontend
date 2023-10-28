import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";
import { getSignUpIsLoading } from "./getSignUpIsLoading";

describe("getSignUpIsLoading.test", () => {
    test("Should return true", () => {
        const state: DeepPartial<StateSchema> = {
            signUp: {
                isLoading: true,
            },
        };
        expect(getSignUpIsLoading(state as StateSchema)).toEqual(true);
    });
    test("Should return false", () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getSignUpIsLoading(state as StateSchema)).toEqual(false);
    });
});
