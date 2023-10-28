import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";
import { getSignUpEmail } from "./getSignUpEmail";

describe("getSignUpEmail.test", () => {
    test("Should return value", () => {
        const state: DeepPartial<StateSchema> = {
            signUp: {
                email: "email@email.ru",
            },
        };
        expect(getSignUpEmail(state as StateSchema)).toEqual("email@email.ru");
    });

    test("Should work with empty email", () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getSignUpEmail(state as StateSchema)).toEqual("");
    });
});
