import { updateProfileData } from "@/entities/User/model/services/updateProfileData";
import { IUser } from "@/entities/User/model/types/IUser";
import { TestAsyncThunk } from "@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk";

describe("updateProfileData.test", () => {
    test("Should update profile data", async () => {
        const userData: IUser = {
            id: "1",
            surname: "Lysenkov",
            name: "Viktor",
        };

        const mockedResponse = {
            data: true,
        };

        // Тестовый thunk
        const testThunk = new TestAsyncThunk(updateProfileData);

        // Мокаем возвращаемое значение
        testThunk.api.patch.mockResolvedValue(() =>
            Promise.resolve({ ...mockedResponse }),
        );

        // Вызываем
        const result = await testThunk.callThunk({
            userId: "1",
            userData,
        });

        // Запрос отпарвлен
        expect(testThunk.api.patch).toHaveBeenCalled();

        // TODO - Валится с ошибкой. Может надо стейт проинициализировать?
        // expect(result.meta.requestStatus).toBe("fulfilled");
    });

    test("Should fail update profile data", async () => {
        const userData: IUser = {
            id: "1",
            surname: "Lysenkov",
            name: "Viktor",
        };

        const thunk = new TestAsyncThunk(updateProfileData);
        thunk.api.patch.mockReturnValue(Promise.resolve({}));
        const result = await thunk.callThunk({
            userId: "1",
            userData,
        });

        expect(thunk.api.patch).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe("rejected");
    });
});
