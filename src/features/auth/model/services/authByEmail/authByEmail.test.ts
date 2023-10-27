import { IUser } from "@/entities/User/model/types/IUser";
import { authByEmail } from "@/features/auth";
import { TestAsyncThunk } from "@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk";

// TODO: починить тест
describe("authByEmail.test", () => {
    test("Success login", async () => {
        const userValue: IUser = {
            id: "1",
            email: "user@mail.ru",
            token: "TOKEN",
        };

        const thunk = new TestAsyncThunk(authByEmail);
        thunk.api.post.mockResolvedValue({ data: userValue });
        const result = await thunk.callThunk({
            email: "user@mail.ru",
            password: "123456",
        });

        console.log("RESULT:" + JSON.stringify(result.payload));

        // expect(thunk.dispatch).toHaveBeenCalledWith(
        //     userActions.setAuthData(userValue),
        // );
        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        // Метод вызвался
        // expect(thunk.api.post).toHaveBeenCalled();
        // // Async thunk отработал без ошибки
        expect(result.meta.requestStatus).toBe("fulfilled");
        //
        // expect(result.payload).toEqual(userValue);
    });
    // test("error login", async () => {
    //     const thunk = new TestAsyncThunk(loginByUsername);
    //     thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));
    //     const result = await thunk.callThunk({
    //         username: "123",
    //         password: "123",
    //     });
    //
    //     expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    //     // Метод вызвался
    //     expect(thunk.api.post).toHaveBeenCalled();
    //     // Async thunk отработал без ошибки
    //     expect(result.meta.requestStatus).toBe("rejected");
    //
    //     expect(result.payload).toBe("error");
    // });
});
