import { createSlice } from '@reduxjs/toolkit'

const schedulerNewRecordSlice = createSlice({
    name: 'form',
    reducers: {
        addScheduler(state, action) {
            state.data.push({
                eventTitleId: action.payload.eventTitleId,
                eventTypeId: action.payload.eventTypeId,
                eventDateId: action.payload.eventDateId,
                reminderDateId: action.payload.reminderDateId,
                calendarContentId: action.payload.calendarContentId,
            });
        },
    },
});

export const { addScheduler } = schedulerNewRecordSlice.actions;
export const schedulerReducer = schedulerNewRecordSlice.reducer;