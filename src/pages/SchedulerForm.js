import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { changeEventTitleId, changeEventTypeId, changeEventDateId, changeReminderDateId, changeCalendarContentId } from '../store/slices/formSlice';
import SaveIcon from '@mui/icons-material/Save';
import { addScheduler } from '../store/slices/schedulerSlice';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dialog, DialogContent, DialogContentText, DialogActions, DialogTitle, Grid, Card, CardActions, CardContent, CardMedia, Typography, Button, Stack, TextField, MenuItem, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CancelIcon from '@mui/icons-material/Cancel';
function SchedulerForm() {

    const [eventType, setEventType] = useState('')

    const dispatch = useDispatch()
    const { eventTitleId, eventTypeId, eventDateId, reminderDateId, calendarContentId } = useSelector((state) => {
        return {
            eventTitleId: state.form.eventTitleId,
            eventTypeId: state.form.eventTypeId,
            eventDateId: state.form.eventDateId,
            reminderDateId: state.form.reminderDateId,
            calendarContentId: state.form.calendarContentId
        };
    });

    const handleSubmit = (event) => {
        debugger;
        event.preventDefault();
        dispatch(addScheduler({ eventTitleId, eventTypeId, eventDateId, reminderDateId, calendarContentId }));
    };

    console.log(eventTitleId, eventTypeId, eventDateId, reminderDateId, calendarContentId);
    return (
        <Box component="form" id="NewWeaseReactRecordFormId" onSubmit={handleSubmit} >
            <Grid container display="flex" spacing={1} >
                <Grid item={true} md={4}>
                    <TextField variant="outlined" size="small" label="Event Title" onChange={(event) => { dispatch(changeEventTitleId(event.target.value)); }} value={eventTitleId} />
                </Grid>
                <Grid item={true} md={4}>
                    <TextField
                        size="small"
                        label="Event Type" select fullWidth onChange={(event) => { dispatch(changeEventTypeId(event.target.value)); }} value={eventTypeId}>
                        <MenuItem value="reminder">Reminder</MenuItem>
                        <MenuItem value="birthday">Birthday</MenuItem>
                        <MenuItem value="meeting">Meeting</MenuItem>
                    </TextField>
                </Grid>
                <Grid item={true} md={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker slotProps={{ textField: { size: 'small' } }} format="DD.MM.YYYY"
                            label="Event Date" onChange={(newValue) => { dispatch(changeEventDateId(newValue)); }} selected={eventDateId}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item={true} md={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker slotProps={{ textField: { size: 'small' } }} format="DD.MM.YYYY"
                            label="Reminder" onChange={(newValue) => { dispatch(changeReminderDateId(newValue)); }} value={reminderDateId}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item={true} md={8}>
                    <TextField fullWidth variant="outlined" size="small" label="Content" onChange={(event) => { dispatch(changeCalendarContentId(event.target.value)); }} value={calendarContentId} />
                </Grid>
            </Grid>

            <DialogActions>
                {/* <Button size="small" startIcon={<CancelIcon />} variant='contained' onClick={() => setDialogOpen(false)}
                    color="error">Cancel</Button> */}
                <Button size="small" startIcon={<CancelIcon />} variant='contained'
                    color="error">Cancel</Button>
                <Button type="submit" size="small" startIcon={<SaveIcon />} variant='contained' color="success"  >Save</Button>
            </DialogActions>
        </Box>
    )
}
export default SchedulerForm