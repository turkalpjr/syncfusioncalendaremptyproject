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
            debugger;
            state.searchTextId = action.payload;
        },
        changeOperationTypesId(state, action) {
            debugger;
            state.operationTypesId = action.payload;
        },
        changeStatusesId(state, action) {
            debugger;
            state.statusesId = action.payload;
        }
    },

});

export const { changeSearchTextId, changeOperationTypesId, changeStatusesId } = filterFormSlice.actions;
export const filterFormReducer = filterFormSlice.reducer;