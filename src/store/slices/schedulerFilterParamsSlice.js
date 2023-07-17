import { createSlice } from '@reduxjs/toolkit'

const filterFormSlice = createSlice({
    name: 'filterform',
    initialState: {
        searchTextId: '',
        operationTypesId: [],
        statusesId: []
    },
    reducers: {
        changeSearchTextId(state, action) {
            state.searchTextId = action.payload;
        },
        changeOperationTypesId(state, action) {
            state.operationTypesId = action.payload;
        },
        changeStatusesId(state, action) {
            state.statusesId = action.payload;
        }
    },

});

export const { changeSearchTextId, changeOperationTypesId, changeStatusesId } = filterFormSlice.actions;
export const filterFormReducer = filterFormSlice.reducer;