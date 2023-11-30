import { initializeEmployeesPage } from "@/features/Employees/employeesList/model/services/initializeEmployeesPage/initializeEmployeesPage";
import { TestAsyncThunk } from "@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk";

describe("initializeEmployeesPage.test", () => {
    test("Should return data", async () => {
        // Тестовый thunk
        const testThunk = new TestAsyncThunk(initializeEmployeesPage);

        const searchParams = new URLSearchParams();
        searchParams.append("searchQuery", "");

        // Вызываем
        const result = await testThunk.callThunk(searchParams);

        expect(testThunk.dispatch).toHaveBeenCalledTimes(4); // Почему 4, а не 3?
        expect(result.meta.requestStatus).toBe("fulfilled");
    });
});
