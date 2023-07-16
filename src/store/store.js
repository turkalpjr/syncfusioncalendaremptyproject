import { configureStore } from '@reduxjs/toolkit'
import { formReducer } from './slices/formSlice';
import { filterFormReducer } from './slices/schedulerFilterParamsSlice';

export const store = configureStore({
    reducer: {
        form: formReducer,
        filterform: filterFormReducer
    },
});