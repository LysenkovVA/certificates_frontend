import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";
import { getSignUpRepeatedPassword } from "./getSignUpRepeatedPassword";

describe("getSignUpRepeatedPassword.test", () => {
    test("Should return value", () => {
        const state: DeepPartial<StateSchema> = {
            signUp: {
                repeatedPassword: "123",
            },
        };
        expect(getSignUpRepeatedPassword(state as StateSchema)).toEqual("123");
    });

    test("Should work with empty password", () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getSignUpRepeatedPassword(state as StateSchema)).toEqual("");
    });
});
