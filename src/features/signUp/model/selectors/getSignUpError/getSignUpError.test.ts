import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";
import { getSignUpError } from "./getSignUpError";

describe("getSignUpError.test", () => {
    test("Should return error", () => {
        const state: DeepPartial<StateSchema> = {
            signUp: {
                error: "error",
            },
        };

        expect(getSignUpError(state as StateSchema)).toEqual("error");
    });
    test("Should work with empty state", () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getSignUpError(state as StateSchema)).toEqual("");
    });
});
