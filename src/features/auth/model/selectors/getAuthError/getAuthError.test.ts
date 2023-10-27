import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";
import { getAuthError } from "./getAuthError";

describe("getAuthError.test", () => {
    test("Should return error", () => {
        const state: DeepPartial<StateSchema> = {
            auth: {
                error: "error",
            },
        };

        expect(getAuthError(state as StateSchema)).toEqual("error");
    });
    test("Should work with empty state", () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getAuthError(state as StateSchema)).toEqual("");
    });
});
