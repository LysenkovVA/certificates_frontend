import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { constructionObjectsListAdapter } from "../adapter/constructionObjectsListAdapter";
import { fetchConstructionObjects } from "../services/fetchConstructionObjects/fetchConstructionObjects";
import { ConstructionObjectsSchema } from "../types/ConstructionObjectsSchema";

const initialState: ConstructionObjectsSchema = {
    ids: [],
    entities: {},
    isLoading: false,
    error: undefined,
    limit: 10,
    offset: 0,
    hasMore: true,
    _isInitialized: false,
};

export const constructionObjectsSlice = createSlice({
    name: "constructionObjectsSlice",
    initialState,
    reducers: {
        setOffset: (state, action: PayloadAction<number>) => {
            state.offset = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchConstructionObjects.pending, (state, action) => {
                state.isLoading = true;
                state.error = undefined;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Очищаем старые
                    constructionObjectsListAdapter.removeAll(state);
                }
            })
            .addCase(fetchConstructionObjects.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = undefined;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Записываем новые данные
                    constructionObjectsListAdapter.setAll(
                        state,
                        action.payload.rows,
                    );
                } else {
                    // Добавляем порцию данных
                    constructionObjectsListAdapter.addMany(
                        state,
                        action.payload.rows,
                    );
                }

                state._isInitialized = true;
                // Есть ли еще данные
                state.hasMore = action.payload.count > state.ids.length;
            })
            .addCase(fetchConstructionObjects.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    actions: constructionObjectsActions,
    reducer: constructionObjectsReducer,
} = constructionObjectsSlice;
