import { createSlice } from '@reduxjs/toolkit'
import { addScheduler } from './schedulerNewRecordSlice';

const formSlice = createSlice({
    name: 'form',
    initialState: {
        eventTitleId: '',
        eventTypeId: '',
        eventDateId: '',
        reminderDateId: '',
        calendarContentId: ''
    },
    reducers: {
        changeEventTitleId(state, action) {
            state.eventTitleId = action.payload;
        },
        changeEventTypeId(state, action) {
            state.eventTypeId = action.payload;
        },
        changeEventDateId(state, action) {
            state.eventDateId = action.payload;
        },
        changeReminderDateId(state, action) {
            state.reminderDateId = action.payload;
        },
        changeCalendarContentId(state, action) {
            state.calendarContentId = action.payload;
        },
    },
 
});

export const { changeEventTitleId, changeEventTypeId, changeEventDateId, changeReminderDateId, changeCalendarContentId } = formSlice.actions;
export const formReducer = formSlice.reducer;