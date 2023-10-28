import { authReducer, AuthSchema } from "../../index";
import { authActions } from "../../model/slice/authSlice";

describe("authSlice.test", () => {
    test("Test set email", () => {
        const state: DeepPartial<AuthSchema> = { email: "" };
        expect(
            authReducer(
                state as AuthSchema,
                authActions.setEmail("email@email.ru"),
            ),
        ).toEqual({ email: "email@email.ru" });
    });

    test("Test set password", () => {
        const state: DeepPartial<AuthSchema> = { password: "" };
        expect(
            authReducer(state as AuthSchema, authActions.setPassword("123123")),
        ).toEqual({ password: "123123" });
    });
});
