import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";
import { getSignUpPassword } from "./getSignUpPassword";

describe("getSignUpPassword.test", () => {
    test("Should return value", () => {
        const state: DeepPartial<StateSchema> = {
            signUp: {
                password: "123",
            },
        };
        expect(getSignUpPassword(state as StateSchema)).toEqual("123");
    });

    test("Should work with empty password", () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getSignUpPassword(state as StateSchema)).toEqual("");
    });
});
