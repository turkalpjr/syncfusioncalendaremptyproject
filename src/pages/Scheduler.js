import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { useState, useEffect } from 'react';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';




export const Scheduler = () => {
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

    let queryString = '&Statusesstr=' + JSON.stringify(Statuses);


    const dataManger = new DataManager({
        url: 'https://localhost:44342/api/calendar/eventsforscheduler?All=true' + queryString,
        adaptor: new ODataV4Adaptor(),
        headers: [{ 'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyNSIsInVuaXF1ZV9uYW1lIjoiU8O8bGV5bWFuICBEw7x6Z8O8biIsInJvbGUiOiJTYWxlc01hbmFnZXIiLCJuYmYiOjE2ODg3MzE4OTMsImV4cCI6MTY4OTE2Mzg5MywiaWF0IjoxNjg4NzMxODkzfQ.uNf5_pqHknumT_Tz0aAEBoCU3JBIPjxxeZJkGzK6Apz78jZa3eCJ2bL3UuPs596FOBkO4UELwQY-qcwN83ImrA' }]
    });



    const eventSettings = { dataSource: dataManger };


    const onDataBinding = (e) => {
        let items = e.result;
        let scheduleData = [];
        debugger;
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
        debugger;
    }
    const onDestroyed = () => {
        debugger;
    }


    return (

        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
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
    )
}


