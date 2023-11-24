import { ConstructionObjectsSchema } from "@/entities/ConstructionObject";
import { constructionObjectsAdapter } from "@/entities/ConstructionObject/model/adapter/constructionObjectsAdapter";
import { fetchConstructionObjects } from "@/entities/ConstructionObject/model/services/fetchConstructionObjects/fetchConstructionObjects";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ConstructionObjectsSchema = {
    ids: [],
    entities: {},
    isLoading: false,
    error: undefined,
    limit: 10,
    offset: 0,
    hasMore: true,
    _isInited: false,
};

export const constructionObjectsSlice = createSlice({
    name: "constructionObjectsSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchConstructionObjects.pending, (state, action) => {
                state.isLoading = true;
                state.error = undefined;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Очищаем старые
                    constructionObjectsAdapter.removeAll(state);
                }
            })
            .addCase(fetchConstructionObjects.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = undefined;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Записываем новые данные
                    constructionObjectsAdapter.setAll(
                        state,
                        action.payload.rows,
                    );
                } else {
                    // Добавляем порцию данных
                    constructionObjectsAdapter.addMany(
                        state,
                        action.payload.rows,
                    );
                }

                state._isInited = true;
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
