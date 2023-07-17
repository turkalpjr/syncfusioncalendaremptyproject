import { Grid, Button, TextField, MenuItem, Box } from '@mui/material';
import React from 'react'
import { changeSearchTextId, changeOperationTypesId, changeStatusesId } from '../store/slices/schedulerFilterParamsSlice';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import axios from 'axios';
function SchedulerFilterForm(props) {
    const formatDate = (d) => {
        var dd = d.getDate();
        var mm = d.getMonth() + 1;
        var yyyy = d.getFullYear();
        if (dd < 10) { dd = '0' + dd }
        if (mm < 10) { mm = '0' + mm };
        return d = yyyy + '-' + mm + '-' + dd;
    }
    const [operationType, setOperationType] = props.useState([])
    const [leadStatus, setLeadStatus] = props.useState([]);
    const handleStatusChange = (event) => {
        setLeadStatus(event.target.value);
    };
    const { searchTextId, operationTypesId, statusesId } = props.useSelector((state) => {

        return {
            searchTextId: state.filterform.searchTextId,
            operationTypesId: state.filterform.operationTypesId,
            statusesId: state.filterform.statusesId,
        };
    });
    const handleSchedulerFilterSubmit = (e) => {
        e.preventDefault();
        var schObj = document.getElementById("WeaseSchedulerId").ej2_instances[0];
        var currentViewDates = schObj.getCurrentViewDates();
        var Start = formatDate(currentViewDates[0]);
        var End = formatDate(currentViewDates[currentViewDates.length - 1]);
        let QueryString = "?Start=" + Start + "&End=" + End;
        if (searchTextId != "") {
            QueryString += "&searchTextId=" + searchTextId;
        }
        if (operationTypesId.length > 0) {
            QueryString += "&operationTypesId="
            QueryString += JSON.stringify(operationTypesId);
        }
        if (statusesId.length > 0) {
            QueryString += "&statusesId="
            QueryString += JSON.stringify(statusesId);
        }
        var token = props.ReturnToken();
        axios({
            method: "get",
            url: "https://localhost:44342/api/calendar/eventsforscheduler" + QueryString,
            headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
        })
            .then(function (response) {
                var schObj = document.getElementById("WeaseSchedulerId").ej2_instances[0];
                schObj.eventSettings.dataSource = response.data;
            })
            .catch(function (response) {

            });
    }

    return (
        <Box component="form" onSubmit={handleSchedulerFilterSubmit} >
            <Grid container display="flex" spacing={1} >
                <Grid item={true} md={12}> <Box><TextField
                    inputProps={{
                        style: {
                            height: "11px",
                        },
                    }}
                    fullWidth label="Search" onChange={(event) => { props.dispatch(changeSearchTextId(event.target.value)); }} value={searchTextId} /></Box> </Grid>
                <Grid item={true} md={2}>
                    <Box  >
                        <TextField
                            size="small"
                            SelectProps={{
                                multiple: true
                            }} defaultValue={[]}
                            label="Operation Types" select fullWidth onChange={(event) => { props.dispatch(changeOperationTypesId(event.target.value)); }} value={operationTypesId} >
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
                            }} defaultValue={[]}
                            label="Statuses" select fullWidth onChange={(event) => { props.dispatch(changeStatusesId(event.target.value)); }} value={statusesId} >
                            {props.leadStatuses?.map((data) => (
                                <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                            ))}
                        </TextField>
                    </Box >
                </Grid>
                <Grid item={true} md={2}  > <Box display="flex" justifyContent="flex-end"><Button onClick={() => props.setDialogOpen(true)} color="success" size="small" variant='contained' startIcon={<AddIcon />}> Add Record</Button></Box>      </Grid>
                <Grid item={true} md={2}  > <Box display="flex" justifyContent="flex-end"><Button type="submit" size="small" variant='contained' startIcon={<RefreshIcon />}> Refresh Calendar</Button></Box>      </Grid>
            </Grid>
        </Box>
    )
}
export default SchedulerFilterForm