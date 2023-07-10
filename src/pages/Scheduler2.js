import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { useState, useEffect } from 'react';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';
import { useRef } from 'react';
import axios from 'axios';
import { MultiSelect } from "react-multi-select-component";
import Switch from "react-switch";

export const Scheduler2 = () => {


    let _scheduleData = [];



    const StatusesDs = [];

    const [_selectedLeadStatuses, setSelected] = useState([]);


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
                for (var i = 0; i < response.data.length; i++) {
                    debugger;
                    var statusItem = { label: response.data[i].name, value: response.data[i].id };
                    StatusesDs.push(statusItem);
                }
            })
    }

    const FillScheduler = () => {
        FillStatuses();

        const Token = ReturnToken();

        let QueryString = "";
        var schObj = document.getElementById("WeaseSchedulerId").ej2_instances[0];
        var currentViewDates = schObj.getCurrentViewDates();
        debugger;
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


    const [calRef, setCalRef] = useState(); // calendar ref 
    const [filters, setFilters] = useState(_scheduleData);


    const [data, setScheduleData] = useState(filters);

    useEffect(() => {
        if (data && calRef) {
            // this is executed every time data changed 
            console.log('data is changed, run refresh, data = ', data);

            calRef.refreshEvents();
        }
    }, [data, calRef]);



    const Statuses = [30, 3];

    let statusTypes = document.querySelectorAll('.statusType:not(.click)');
    let statusList = [];
    if (statusTypes) {
        for (var i = 0; i < statusTypes.length; i++) {
            statusList.push(statusTypes[i].getAttribute("radio-value"));
        }
    }



    const updateFilters = () => {

        FillScheduler();

    };


    const onDragStart = (arg) => {
        // eslint-disable-next-line no-param-reassign
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
        debugger;
        FillScheduler();
    };

    const handleSwitchChange = (checked) => {
        ///  this.setState({ checked });
    }

    const eventSettings = { dataSource: data };
    return (
        <>
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                <button onClick={updateFilters}>REFRESH BUTTON PLEASE 2</button>

                <input type="text" id="WeaseSchedulerSearchTextId"></input>

                <div>
                    <h1>Select Lead Status(es)..</h1>
                    <div id="SelectedLeadStatusesDivId" style={{ display: "block" }}>{JSON.stringify(_selectedLeadStatuses)} </div>
                    <MultiSelect
                        options={StatusesDs}
                        value={_selectedLeadStatuses}
                        onChange={setSelected}
                        labelledBy="Select lead status(es).."
                        id="WeaseSchedulerLeadStatusId"
                    />
                </div>

                <label>
                    <span>Switch with default style</span>
                    <Switch onChange={handleSwitchChange} />
                </label>


                <ScheduleComponent id="WeaseSchedulerId"
                    width='100%' height='550px' currentView='Month' eventSettings={eventSettings} created={onCreated} destroyed={onDestroyed} dataBinding={onDataBinding}
                    dragStart={onDragStart}
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
            </div >
        </>

    )
}


