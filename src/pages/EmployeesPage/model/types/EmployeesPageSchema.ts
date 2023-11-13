import { IEmployee } from "@/entities/Employee/model/types/IEmployee";
import { EntityState } from "@reduxjs/toolkit";

export interface EmployeesPageSchema extends EntityState<IEmployee> {
    // Состояния
    isLoading?: boolean;
    error?: string;
    // Пагинация
    limit: number;
    offset: number;
    hasMore: boolean;
    // Фильтры
    searchQuery?: string;
    // Флаг инициализации состояния из строки запроса
    _isInitialized: boolean;
}
