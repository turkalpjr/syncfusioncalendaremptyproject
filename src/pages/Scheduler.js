import React from 'react'
import { useState, useEffect } from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { Dialog, DialogContent, DialogContentText, DialogTitle, Grid, Card, CardActions, CardContent, CardMedia, Typography, Button, Stack, TextField, MenuItem, Box } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';
import { useRef } from 'react';
import axios from 'axios';

import SchedulerForm from './SchedulerForm';
export const Scheduler = () => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const handleStatusChange = (event) => {
        setLeadStatus(event.target.value);
    };
    const handleBackdropClick = () => {
        return false;
    };
    const handleDialogClose = (e) => {

    };
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

    const formatDate2 = (d) => {
        var dd = d.getDate();
        var mm = d.getMonth() + 1;
        var yyyy = d.getFullYear();
        if (dd < 10) { dd = '0' + dd }
        if (mm < 10) { mm = '0' + mm };
        return d = dd + '-' + mm + '-' + yyyy;
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
        FillScheduler();
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

    const onActionBegin = (e) => {
        if (e.requestType == "dateNavigate") {
            setTimeout(function () {
                FillScheduler();
            }, 500);
        }
    }

    return (
        <>
            <Dialog onBackdropClick={handleBackdropClick} open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Add new record..</DialogTitle>
                <DialogContent>
                    <SchedulerForm ReturnToken={ReturnToken} formatDate2={formatDate2} FillScheduler={FillScheduler} setDialogOpen={setDialogOpen} />
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
                    <ScheduleComponent id="WeaseSchedulerId" actionBegin={onActionBegin} firstDayOfWeek={1}
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


