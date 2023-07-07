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


    const dataManger = new DataManager({
        url: 'https://localhost:44342/api/calendar/eventsforscheduler',
        adaptor: new ODataV4Adaptor(),
        headers: [{ 'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyNSIsInVuaXF1ZV9uYW1lIjoiU8O8bGV5bWFuICBEw7x6Z8O8biIsInJvbGUiOiJTYWxlc01hbmFnZXIiLCJuYmYiOjE2ODg3MTkyMTUsImV4cCI6MTY4OTE1MTIxNSwiaWF0IjoxNjg4NzE5MjE1fQ.C4aMDiNmT1hFn90RLsKSrplUrBaK2VwTczyoZ-rfN7RXsp2BX_-_bcwpVrceNZtF-Jb7jZVTH3HqSnUXf_vt9w' }]
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

    return (

        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <ScheduleComponent
                width='100%' height='550px' currentView='Month' eventSettings={eventSettings} dataBinding={onDataBinding}
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
