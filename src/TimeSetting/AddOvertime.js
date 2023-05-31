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
import axios from 'axios';
import { Link } from 'react-router-dom';

const AddOvertime = () => {
    const [_id, set_Id] = useState('');
    const [empid, setEmpid] = useState("");
    const [empname, setEmpname] = useState("");
    const [overtimetype, setOvertimetype] = useState("");
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState("");
    const [selectedProducts, setSelectedProducts] = useState(null);

    const [overtimedate, setOvertimedate] = useState("");
    const [totalot, setTotalot] = useState("");
    const [breaktime, setBreaktime] = useState("");
    const [selectedshift, setSelectedshift] = useState(null);
    const [compensation, setCompensation] = useState("");

    const [requestdate, setRequestdate] = useState("");
    const [checkin, setCheckin] = useState("");
    const [checkout, setCheckout] = useState("");
    const [breaktime1, setBreaktime1] = useState("");
    const [compensation1, setCompensation1] = useState("");

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

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    // }

    const onShiftChange = (e) => {
        setSelectedshift(e.value);
    }
    const shifts = [
        { name: 'Before Shift' },
        { name: 'After Shift' }
    ];

    const onCompensationChange = (e) => {
        setCompensation(e.value);
    }
    const overtimes = [
        { name: 'Paid Over Time' },
        { name: 'Leave Over Time' }
    ]

    const onCompensation1Change = (e) => {
        setCompensation1(e.value);
    }
    const overtimes1 = [
        { name: 'Paid Over Time' },
        { name: 'Leave Over Time' }
    ]

    // useEffect(() => {
    //     getUsers();
    // }, [])
    // function getUsers() {
    //     fetch(`${process.env.REACT_APP_API_KEY}/user`).then((result) => {
    //         result.json().then((resp) => {
    //             setUsers(resp)
    //         })
    //     })
    // }
    // console.warn(users)

    useEffect(() => {
        // Fetch all users from the server
        axios.get(`${process.env.REACT_APP_API_KEY}/user`)
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleUserSelection = (event) => {
        const userId = event.target.value;
        const isSelected = event.target.checked;
        if (isSelected) {
            setSelectedProducts([...selectedProducts, userId]);
        } else {
            setSelectedProducts(selectedProducts.filter(id => id !== userId));
        }
    }

    // Post Method for Overtime On Weekdays
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`${process.env.REACT_APP_API_KEY}/weekdayovertime`, {
            selectedUsers: selectedProducts,
            overtimedate: overtimedate,
            totalot: totalot,
            breaktime: breaktime,
            selectedshift: selectedshift,
            compensation: compensation,
        })
            .then(response => {
                setMessage('Overtime added successfully');
                setSelectedProducts([]);
                setOvertimedate('');
                setTotalot('');
                setBreaktime('');
                setSelectedshift('');
                setCompensation('');
            })
            .catch(error => {
                console.error(error);
                setMessage('Failed to add schedule');
            });
    }

    // Post Method for Overtime On holiday
    const SubmitData = (event) => {
        event.preventDefault();
        axios.post(`${process.env.REACT_APP_API_KEY}/holidayovertime`, {
            selectedUsers: selectedProducts,
            requestdate: requestdate,
            checkin: checkin,
            checkout: checkout,
            breaktime1: breaktime1,
            compensation1: compensation1
        })
            .then(response => {
                setMessage('Schedule added successfully');
                setSelectedProducts([]);
                setRequestdate('');
                setCheckin('');
                setCheckout('');
                setBreaktime1('');
                setCompensation1('');
            })
            .catch(error => {
                console.error(error);
                setMessage('Failed to add schedule');
            });
    }


    return (

        <div class="grid">

            <div class="field col-12 md:col-12" style={{ display: "flex", height: "60px" }} >
                &nbsp;     &nbsp;       &nbsp;          &nbsp;       &nbsp;         &nbsp;       &nbsp;
                <div>
                    <Button label='Add Overtime' onClick={() => onClick('displayBasic')} style={{ backgroundColor: "lightslategray", height: "15px" }} />
                    <Dialog visible={displayBasic} style={{ width: '50vw' }} onHide={() => onHide('displayBasic')} >
                        <TabView>
                            <TabPanel header="Overtime on Weekdays">
                                <br /> <form onSubmit={handleSubmit}>
                                    <ScrollPanel style={{ height: '40vh', color: "gray" }}>
                                        <div className="p-fluid grid">

                                            <div class="field col-12 md:col-6">
                                                <label htmlFor="date" className="block"> Overtime Date </label>
                                                <InputText style={{ height: "10px" }} type="date" value={overtimedate} onChange={(e) => { setOvertimedate(e.target.value) }} required /><br /><br />
                                            </div>

                                            <div class="field col-12 md:col-6">
                                                <label htmlFor="username1" className="block"> Duration </label>
                                                <InputText style={{ height: "10px" }} type="text" value={totalot} onChange={(e) => { setTotalot(e.target.value) }} /><br /><br />
                                                {/* <input type="time" value={duration} onChange={(e) => { setDuration(e.target.value) }} /><br /><br /> */}

                                            </div>

                                            {/* <div class="field col-12 md:col-6">
                                                <label htmlFor="name" className="block"> Break time</label>
                                                <InputText style={{ height: "10px" }} type="text" value={breaktime} onChange={(e) => { setBreaktime(e.target.value) }} /><br /><br />
                                            </div> */}

                                            <div class="field col-12 md:col-6">
                                                <label htmlFor="name" className="block"> Overtime Type </label>
                                                <Dropdown value={selectedshift} options={shifts} onChange={onShiftChange} optionLabel="name" optionValue="name" placeholder="Select Overtime-type" style={{ height: "35px" }} /><br />
                                            </div>

                                            <div class="field col-12 md:col-6">
                                                <label htmlFor="name" className="block"> Compensation </label>
                                                <Dropdown value={compensation} options={overtimes} onChange={onCompensationChange} optionLabel="name" optionValue="name" placeholder="Select Compensation" style={{ height: "35px" }} /><br />
                                            </div>

                                            <div style={{ marginLeft: "110px" }}>
                                                <Link to="/OvertimeSetting">
                                                    <Button
                                                        style={{ height: "40px", width: "95px" }}
                                                        label="Submit"
                                                        onClick={handleSubmit}
                                                        type="button"
                                                        className="p-button-outlined" />
                                                    &nbsp;      &nbsp;
                                                    <Button
                                                        style={{ height: "40px", width: "90px" }}
                                                        label="Cancel"
                                                        className="p-button-outlined" />
                                                </Link>
                                            </div>
                                        </div>
                                    </ScrollPanel>
                                </form>
                            </TabPanel>
                            <TabPanel header="Overtime on Holiday">
                                <br /> <form onSubmit={SubmitData}>
                                    <ScrollPanel style={{ height: '40vh', color: "gray" }}>
                                        <div className="p-fluid grid">

                                            <div class="field col-12 md:col-6">
                                                <label htmlFor="date" className="block"> Date </label>
                                                <InputText style={{ height: "10px" }} type="date" value={requestdate} onChange={(e) => { setRequestdate(e.target.value) }} required /><br /><br />
                                            </div>

                                            <div class="field col-12 md:col-6">
                                                <label htmlFor="username1" className="block">  Schedule Chcek-In </label>
                                                <input type="time" value={checkin} onChange={(e) => { setCheckin(e.target.value) }} /><br /><br />
                                                {/* <Calendar id="time12" value={duration1} onChange={(e) => setDuration1(e.value)} timeOnly hourFormat="12" style={{ height: "10px" }} /><br /><br /> */}
                                            </div>

                                            <div class="field col-12 md:col-6">
                                                <label htmlFor="name" className="block"> Schedule Check-Out </label>
                                                <input type="time" value={checkout} onChange={(e) => { setCheckout(e.target.value) }} /><br /><br />

                                            </div>

                                            <div class="field col-12 md:col-6">
                                                <label htmlFor="name" className="block"> Break time</label>
                                                <InputText style={{ height: "10px" }} type="text" value={breaktime1} onChange={(e) => { setBreaktime1(e.target.value) }} /><br /><br />
                                            </div>

                                            <div class="field col-12 md:col-6">
                                                <label htmlFor="name" className="block"> Compensation </label>
                                                <Dropdown value={compensation1} options={overtimes1} onChange={onCompensation1Change} optionLabel="name" optionValue="name" placeholder="Select Compensation" style={{ height: "35px" }} /><br />
                                            </div>

                                            <div style={{ marginLeft: "110px" }}>
                                                <Link to="/OvertimeSetting">
                                                    <Button
                                                        style={{ height: "40px", width: "95px" }}
                                                        label="Submit"
                                                        onClick={SubmitData}
                                                        type="button"
                                                        className="p-button-outlined" />
                                                    &nbsp;      &nbsp;
                                                    <Button
                                                        style={{ height: "40px", width: "90px" }}
                                                        label="Cancel"
                                                        className="p-button-outlined" />
                                                </Link>
                                            </div>
                                        </div>
                                    </ScrollPanel>
                                </form>
                            </TabPanel>
                        </TabView>
                    </Dialog>
                </div>
            </div >
            <div style={{ overflow: 'auto' }} >
                <DataTable value={users} size="small" responsiveLayout="scroll" paginator rows={8}
                    selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)} >
                    &nbsp;   <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                    <Column field="name" header="Name" ></Column>
                    <Column field="empid" header="Id" ></Column>
                    <Column field="email" header="Email" ></Column>
                    <Column field="jobno" header="Job No" ></Column>
                    <Column field="department" header="Department" ></Column>
                    <Column field="joiningdate" header="Joining Date" ></Column>
                </DataTable>
            </div>
        </div >
    )
}
export default AddOvertime;