import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { useState, useEffect } from 'react';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';
import { useRef } from 'react';



export const Scheduler = () => {
    const scheduleObj1 = useRef(null);
    const PropertyPane = (props) => <div className="mt-5">{props.children}</div>;
    const [scheduleObj, setScheduleObj] = useState();

    const change = (args) => {
        scheduleObj.selectedDate = args.value;
        scheduleObj.dataBind();
    };

    const onDragStart = (arg) => {
        // eslint-disable-next-line no-param-reassign
        arg.navigation.enable = true;
    };
    const Statuses = [30, 3];

    let statusTypes = document.querySelectorAll('.statusType:not(.click)');
    let statusList = [];
    if (statusTypes) {
        for (var i = 0; i < statusTypes.length; i++) {
            statusList.push(statusTypes[i].getAttribute("radio-value"));
        }
    }
    debugger;


    let queryString = '&Statusesstr=' + JSON.stringify(Statuses);

    var Token = "";

    var url = window.location.search.substring(1); //get rid of "?" in querystring
    var qArray = url.split('&'); //get key-value pairs
    for (var i = 0; i < qArray.length; i++) {
        var pArr = qArray[i].split('='); //split key and value
        if (pArr[0] == "Token")
            Token = pArr[1]; //return value
    }


    const dataManger = new DataManager({
        url: 'https://localhost:44342/api/calendar/eventsforscheduler?Allstr=true' + queryString,
        adaptor: new ODataV4Adaptor(),
        headers: [{ 'Authorization': 'Bearer ' + Token }]
    });



    const eventSettings = { dataSource: dataManger };


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

    const RefreshWeaseCalendar = () => {
        scheduleObj1.current.refreshTemplates();
    }

    return (

        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <button id="RefreshReactCalenderButtonId" style={{ display: "block" }} onClick={RefreshWeaseCalendar} type="button" className="btn btn-primary">REFRESH BUTTON</button>
            <ScheduleComponent id="WeaseSchedulerId" ref={scheduleObj1}
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
    )
}


