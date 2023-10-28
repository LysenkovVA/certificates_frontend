import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";
import { getAuthenticatedUser } from "@/entities/User";

describe("getAuthenticatedUser.test", () => {
    test("Should return value", () => {
        const state: DeepPartial<StateSchema> = {
            user: {
                authenticatedUser: {
                    id: "1",
                    email: "email@email.ru",
                    token: "TOKEN",
                },
            },
        };
        expect(getAuthenticatedUser(state as StateSchema)).toEqual({
            id: "1",
            email: "email@email.ru",
            token: "TOKEN",
        });
    });
});
