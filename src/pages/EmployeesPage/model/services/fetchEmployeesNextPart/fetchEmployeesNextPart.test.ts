import { fetchEmployeesNextPart } from "@/pages/EmployeesPage/model/services/fetchEmployeesNextPart/fetchEmployeesNextPart";
import { TestAsyncThunk } from "@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk";

describe("fetchEmployeesNextPart.test", () => {
    test("Should return data", async () => {
        // Тестовый thunk
        const testThunk = new TestAsyncThunk(fetchEmployeesNextPart);

        // Вызываем
        const result = await testThunk.callThunk();

        expect(testThunk.dispatch).toHaveBeenCalledTimes(2);
        expect(result.meta.requestStatus).toBe("fulfilled");
    });
});
