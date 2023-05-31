import React, { useState, useEffect, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { TabView, TabPanel } from 'primereact/tabview';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Calendar } from 'primereact/calendar';
import { Link } from 'react-router-dom';


const OvertimeSetting = () => {
    const [_id, set_Id] = useState('');
    const [users, setUsers] = useState('');
    const [records, setRecords] = useState('');
    const [requestdate, setRequestdate] = useState("");
    const [overtimedate, setOvertimedate] = useState("");
    const [empid, setEmpid] = useState("");
    const [empname, setEmpname] = useState("");
    const [selectedshift, setSelectedshift] = useState(null);
    const [duration, setDuration] = useState("");
    const [breaktime, setBreaktime] = useState("");
    const [overtimetype, setOvertimetype] = useState("");
    const [compensation, setCompensation] = useState("");


    const [displayBasic, setDisplayBasic] = useState(false);
    const [position, setPosition] = useState('center');

    const dialogFuncMap = {
        'displayBasic': setDisplayBasic,
    }

    const onClick = (name, position) => {
        dialogFuncMap[`${name}`](true);
        if (position) {
            setPosition(position);
        }
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const onShiftChange = (e) => {
        setSelectedshift(e.value);
    }
    const shifts = [
        { name: 'Before Shift' },
        { name: 'After Shift' }
    ];

    const onNameChange = (e) => {
        setEmpname(e.value);
    }
    const names = [
        { name: 'Mr.Kamlesh Singh' },
        { name: 'Mr.Ravindra Kale' },
        { name: 'Mrs.Raveena Sharma' },
        { name: 'Miss.Kanika Kapoor' },
        { name: 'Miss.Kriti Sanon' },
        { name: 'Mrs.Poonam Dhage' },
        { name: 'Mrs.Manjusha Kamble' },
        { name: 'Mr.Andy Lambachiya' },
        { name: 'Mrs.Shivani Bachhan' }
    ];

    const onCompensationChange = (e) => {
        setCompensation(e.value);
    }
    const overtimes = [
        { name: 'Paid Over Time' },
        { name: 'Leave Over Time' }
    ]

    // get method for overtime on weekdays
    useEffect(() => {
        getUsers();
    }, [])
    function getUsers() {
        fetch(`${process.env.REACT_APP_API_KEY}/weekdayovertime`).then((result) => {
            result.json().then((resp) => {
                setUsers(resp)
            })
        })
    }
    console.warn(users)

    // get method for overtime on holidays
    useEffect(() => {
        getRecord();
    }, [])
    function getRecord() {
        fetch(`${process.env.REACT_APP_API_KEY}/holidayovertime`).then((result) => {
            result.json().then((resp) => {
                setRecords(resp)
            })
        })
    }
    console.warn(records)

    return (

        <div >
            <div>
                &nbsp;
                <Link to="/AddOvertime" ><Button name="Add Overtime" style={{ backgroundColor: "lightslategray", height: "20px" }} >Add To Overtime </Button></Link>

                &nbsp;
                {/* <Button label="Import" icon="pi pi-upload" style={{ backgroundColor: "lightslategray", height: "20px" }} /> */}


            </div>
            <br />

            <div>

                <TabView>
                    <TabPanel header="Overtime On Weekdays">
                        <div style={{ overflow: 'auto' }} >
                            <br />
                            <DataTable value={users} size="small" responsiveLayout="scroll" paginator rows={12}                            >
                                &nbsp;    &nbsp;      &nbsp;
                                <Column field="name" header="Name" ></Column>
                                <Column field="empid" header="Id" ></Column>
                                <Column field="department" header="Department" ></Column>
                                <Column field="overtimedate" header="Date"  ></Column>
                                <Column field="totalot" header="Overtime"  ></Column>
                                {/* <Column field="breaktime" header="Break-Time"  ></Column> */}
                                <Column field="selectedshift" header="OT Type"  ></Column>
                                <Column field="compensation" header="Compensation"  ></Column>
                            </DataTable>
                        </div>
                    </TabPanel>

                    <TabPanel header="Overtime On Holidays">
                        <div style={{ overflow: 'auto' }} >
                            <br />
                            <DataTable value={records} size="small" responsiveLayout="scroll" paginator rows={8}>
                                &nbsp;    &nbsp;     &nbsp;
                                <Column field="name" header="Name" ></Column>
                                <Column field="empid" header="Id" ></Column>
                                <Column field="department" header="Department" ></Column>
                                <Column field="requestdate" header="Date"  ></Column>
                                <Column field="checkin" header="Time In"  ></Column>
                                <Column field="checkout" header="Time Out"  ></Column>
                                <Column field="totalot" header="Total OT" ></Column>
                                <Column field="breaktime1" header="BreakTime"  ></Column>
                                <Column field="compensation1" header="Compensation"  ></Column>
                            </DataTable>
                        </div>
                    </TabPanel>

                </TabView>

            </div>
        </div >
    )
}
export default OvertimeSetting;