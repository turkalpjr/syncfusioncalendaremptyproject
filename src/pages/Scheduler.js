import React from 'react'
import { useState, useEffect } from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { Dialog, DialogContent, DialogContentText, DialogActions, DialogTitle, Grid, Card, CardActions, CardContent, CardMedia, Typography, Button, Stack, TextField, MenuItem, Box } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';
import { useRef } from 'react';
import axios from 'axios';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const Scheduler = () => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const handleStatusChange = (event) => {
        setLeadStatus(event.target.value);
    };
    const [eventType, setEventType] = useState('')
    const [leadStatuses, setLeadStatuses] = useState([]);
    const [leadStatus, setLeadStatus] = useState([]);
    const [operationType, setOperationType] = useState([])
    const PropertyPane = (props) => <div className="mt-5">{props.children}</div>;
    const formatDate = (d) => {
        var dd = d.getDate();
        var mm = d.getMonth() + 1;
        var yyyy = d.getFullYear();
        if (dd < 10) { dd = '0' + dd }
        if (mm < 10) { mm = '0' + mm };
        return d = yyyy + '-' + mm + '-' + dd;
    }

    const ReturnToken = () => {
        var Token = "";
        var url = window.location.search.substring(1); //get rid of "?" in querystring
        var qArray = url.split('&'); //get key-value pairs
        for (var i = 0; i < qArray.length; i++) {
            var pArr = qArray[i].split('='); //split key and value
            if (pArr[0] == "Token")
                Token = pArr[1]; //return value
        }
        return Token;
    }

    const FillStatuses = () => {
        const Token = ReturnToken();
        const instance = axios.create({
            baseURL: 'https://localhost:44342/api/status',
            headers: { 'Authorization': 'Bearer ' + Token }
        });
        instance.get('')
            .then(response => {
                setLeadStatuses(response.data);
            })
    }

    const FillScheduler = () => {
        FillStatuses();
        const Token = ReturnToken();
        let QueryString = "";
        var schObj = document.getElementById("WeaseSchedulerId").ej2_instances[0];
        var currentViewDates = schObj.getCurrentViewDates();
        var Start = formatDate(currentViewDates[0]);
        var End = formatDate(currentViewDates[currentViewDates.length - 1]);
        QueryString += "?Start=" + Start + "&End=" + End;
        if (document.getElementById("WeaseSchedulerSearchTextId") != null && document.getElementById("WeaseSchedulerSearchTextId") != undefined && document.getElementById("WeaseSchedulerSearchTextId").value != "") {
            QueryString += "&SearchWord=" + document.getElementById("WeaseSchedulerSearchTextId").value;
        }
        const instance = axios.create({
            baseURL: 'https://localhost:44342/api/calendar/eventsforscheduler' + QueryString,
            headers: { 'Authorization': 'Bearer ' + Token }
        });

        instance.get('')
            .then(response => {
                var schObj = document.getElementById("WeaseSchedulerId").ej2_instances[0];
                schObj.eventSettings.dataSource = response.data;
            })
    }

    const updateFilters = () => {
        FillScheduler();
    };
    const onDragStart = (arg) => {
        arg.navigation.enable = true;
    };
    ///  let queryString = '&Statusesstr=' + JSON.stringify(Statuses);
    const onDataBinding = (e) => {
        let items = e.result;
        let scheduleData = [];
        if (items.length > 0) {
            for (let i = 0; i < items.length; i++) {
                scheduleData.push({
                    Id: items[i].id,
                    Subject: items[i].subject,
                    StartTime: items[i].startTime,
                    EndTime: items[i].endTime,
                    IsAllDay: !items[i].startTime,
                    CategoryColor: items[i].categoryColor
                });
            }
        }
        e.result = scheduleData;
    }

    const onCreated = () => {

    }
    const onDestroyed = () => {

    }
    const change = (args) => {

        FillScheduler();
    };

    const Schedule_ViewChanged = (e) => {

    }
    let _scheduleData = [];
    const [filters, setFilters] = useState(_scheduleData);
    const [data, setScheduleData] = useState(filters);
    const eventSettings = { dataSource: data };
    const onEventRendered = (args) => {
        args.element.style.backgroundColor = args.data.CategoryColor;
    }
    useEffect(() => {
    }, []);

    const handleDialogClose = (e) => {

    };
    const handleBackdropClick = () => {
        return false;
    };

    const handleSubmit = event => {
        event.preventDefault();
        debugger;
        const user = {
            name: this.state.name
        }
        // axios.post('https://jsonplaceholder.typicode.com/users', { user })
        //     .then(res => {
        //         console.log(res);
        //         console.log(res.data);
        //         window.location = "/retrieve" //This line of code will redirect you once the submission is succeed
        //     })
    }

    const saveNewWeaseReactRecord = (object) => {
        object.preventDefault();
        debugger;
        var form = document.querySelector('form');
        var data = new FormData(form);
        var token = ReturnToken();

        axios({
            method: "post",
            url: "https://localhost:44342/api/calendar/addnewschedulerrecord",
            data: data,
            headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
        })
            .then(function (response) {
                //handle success
                debugger;
                console.log(response);
            })
            .catch(function (response) {
                //handle error
                debugger;
                console.log(response);
            });



    }
    return (
        <>
            <Dialog onBackdropClick={handleBackdropClick} open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Add new record..</DialogTitle>
                <DialogContent>
                    <Box component="form" id="NewWeaseReactRecordFormId" onSubmit={saveNewWeaseReactRecord} >
                        <Grid container display="flex" spacing={1} >
                            <Grid item={true} md={4}>
                                <TextField name='EventTitleId' id='EventTitleId' variant="outlined" size="small" label="Event Title" />
                            </Grid>
                            <Grid item={true} md={4}>
                                <TextField
                                    size="small" name="EventTypeId" id="EventTypeId"
                                    label="Event Type" select fullWidth value={eventType} onChange={(e) => setEventType(e.target.value)}>
                                    <MenuItem value="reminder">Reminder</MenuItem>
                                    <MenuItem value="birthday">Birthday</MenuItem>
                                    <MenuItem value="meeting">Meeting</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item={true} md={4}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker name="EventDateId" id="EventDateId" slotProps={{ textField: { size: 'small' } }}
                                        label="Event Date"
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item={true} md={4}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker name="ReminderDateId" id="ReminderDateId" slotProps={{ textField: { size: 'small' } }}
                                        label="Reminder"
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item={true} md={8}>
                                <TextField name="ContentId" id="ContentId" fullWidth variant="outlined" size="small" label="Content" />
                            </Grid>
                        </Grid>

                        <DialogActions>
                            <Button size="small" startIcon={<CancelIcon />} variant='contained' onClick={() => setDialogOpen(false)} color="error">Cancel</Button>
                            <Button type="submit" size="small" startIcon={<SaveIcon />} variant='contained' color="success"  >Save</Button>
                        </DialogActions>
                    </Box>
                </DialogContent>
            </Dialog>
            <Grid container display="flex" spacing={1} >
                <Grid item={true} md={12}> <Box><TextField
                    inputProps={{
                        style: {
                            height: "11px",
                        },
                    }}
                    fullWidth label="Search" id="WeaseSchedulerSearchTextId" /></Box> </Grid>

                <Grid item={true} md={2}>
                    <Box  >
                        <TextField
                            size="small"
                            SelectProps={{
                                multiple: true
                            }}
                            label="Operation Types" select fullWidth value={operationType} onChange={(e) => setOperationType(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}>
                            <MenuItem value="operation">Operation</MenuItem>
                            <MenuItem value="meeting">Meeting</MenuItem>
                        </TextField>
                    </Box >
                </Grid>

                <Grid item={true} md={6}>
                    <Box  >
                        <TextField size="small"
                            SelectProps={{
                                multiple: true
                            }}
                            label="Statuses" select fullWidth value={leadStatus} onChange={handleStatusChange}>
                            {leadStatuses?.map((data) => (
                                <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                            ))}
                        </TextField>
                    </Box >
                </Grid>

                <Grid item={true} md={2}  > <Box display="flex" justifyContent="flex-end"><Button onClick={() => setDialogOpen(true)} color="success" size="small" variant='contained' startIcon={<AddIcon />}> Add Record</Button></Box>      </Grid>

                <Grid item={true} md={2}  > <Box display="flex" justifyContent="flex-end"><Button onClick={updateFilters} size="small" variant='contained' startIcon={<RefreshIcon />}> Refresh Calendar</Button></Box>      </Grid>


                <Grid item={true} md={12}>
                    <ScheduleComponent id="WeaseSchedulerId"
                        width='100%' height='550px' viewChanged="Schedule_ViewChanged" currentView='Month' eventSettings={eventSettings} created={onCreated} destroyed={onDestroyed} dataBinding={onDataBinding}
                        dragStart={onDragStart} eventRendered={onEventRendered}
                    >
                        <ViewsDirective>
                            {['Day', 'Week', 'WorkWeek', 'Month', 'Agenda'].map((item) => <ViewDirective key={item} option={item} />)}
                        </ViewsDirective>
                        <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />

                    </ScheduleComponent>
                    <PropertyPane>
                        <table
                            style={{ width: '100%', background: 'white' }}
                        >
                            <tbody>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '100%' }}>
                                        <DatePickerComponent
                                            value={new Date(2021, 0, 10)}
                                            showClearButton={false}
                                            placeholder="Current Date"
                                            floatLabelType="Always"
                                            change={change}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </Grid >
            </Grid >
        </>
    )
}


