import { configureStore } from '@reduxjs/toolkit'
import { formReducer } from './slices/formSlice';
import { schedulerReducer } from './slices/schedulerSlice';

export const store = configureStore({
    reducer: {
        form: formReducer
    },
});