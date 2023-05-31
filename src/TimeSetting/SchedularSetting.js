import React, { useState, useEffect, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { ScrollPanel } from 'primereact/scrollpanel';
import { TabView, TabPanel } from 'primereact/tabview';
import validator from 'validator';
import { Calendar } from 'primereact/calendar';
import { Link } from 'react-router-dom';

const SchedularSetting = () => {
    const [_id, set_Id] = useState('');
    const [emailError, setEmailError] = useState('')
    const [birthdate, setBirthdate] = useState("");
    const [users, setUsers] = useState([])
    const [selectedshift, setSelectedshift] = useState(null);
    const [duration, setDuration] = useState("");
    const [duration1, setDuration1] = useState("");
    const [week, setWeek] = useState("");
    const [effectivedate, setEffectiveDate] = useState("");
    const [shiftenddate, setShiftEndDate] = useState("");
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [displayBasic, setDisplayBasic] = useState(false);
    const [displayBasic2, setDisplayBasic2] = useState(false);
    const [position, setPosition] = useState('center');

    const dialogFuncMap = {
        'displayBasic': setDisplayBasic,
        'displayBasic2': setDisplayBasic2,
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

    // dropdown
    const onShiftChange = (e) => {
        setSelectedshift(e.value);
    }
    const shifts = [
        { name: 'General Shift' },
        { name: 'Second Shift' },
        { name: 'Night Shift' }
    ];

    const onWeekChange = (e) => {
        setWeek(e.value);
    }
    const weeks = [
        { name: '1 Week' },
        { name: '2 Week' },
        { name: '3 Week' },
        { name: '4 Week' },
        { name: '5 Week' }
    ];

    const validateEmail = (e) => {
        var email = e.target.value

        if (validator.isEmail(email)) {
            setEmailError('Valid Email :)')
        } else {
            setEmailError('Enter valid Email!')
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleDownload = async () => {
        const response = await fetch('http://192.168.2.170:8000/download');
        const blob = await response.blob();
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'empdata.csv');
        document.body.appendChild(link);
        link.click();
    };

    // get method  
    useEffect(() => {
        getUsers();
    }, [])
    function getUsers() {
        fetch(`${process.env.REACT_APP_API_KEY}/schedules`).then((result) => {
            result.json().then((resp) => {
                setUsers(resp)
            })
        })
    }
    console.warn(users)

    // update method
    function userData(data) {
        console.log("data", data)
        setSelectedshift(data.selectedshift)
        setEffectiveDate(data.effectivedate)
        setShiftEndDate(data.shiftenddate)
        setWeek(data.week)
        setDuration(data.duration)
        setDuration1(data.duration1)
    }
    function updateUser(userId) {
        let item = {
            selectedshift, effectivedate, shiftenddate, week, duration, duration1
        }
        console.warn("item", item)
        fetch(`${process.env.REACT_APP_API_KEY}/schedules/` + _id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        }).then((result) => {
            result.json().then((resp) => {
                console.warn(resp)
                getUsers();
            })
        })
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button label='Assign Schedule'
                    onClick={() => onClick('displayBasic2')} onMouseDown={() => userData(rowData)} 
                    style={{ backgroundColor: "lightslategray", height: "25px", fontSize: "10px" }} />
            </React.Fragment>
        );
    }
    return (

        <div>
            <div>
                &nbsp;
                <Link to="/AddSchedule" ><Button name="Add To Schedule" style={{ backgroundColor: "lightslategray", height: "20px" }} >Add To Schedule</Button></Link>

                &nbsp;
                <Button label="Import" icon="pi pi-upload" style={{ backgroundColor: "lightslategray", height: "20px" }} />

                &nbsp;
                <Button label="Export" icon="pi pi-download" onClick={handleDownload} style={{ backgroundColor: "lightslategray", height: "20px" }} />

            </div><br />
            <Dialog visible={displayBasic2} style={{ width: '50vw' }} onHide={() => onHide('displayBasic2')}>
                <form onSubmit={handleSubmit} title='Employee Shift Details'>

                    <ScrollPanel style={{ height: '40vh', color: "gray" }}>
                        <div className="p-fluid grid">

                            <div class="field col-12 md:col-12">
                                <Dropdown value={selectedshift} options={shifts} onChange={onShiftChange} optionLabel="name" optionValue="name" placeholder="~~ Select Schedule ~~" style={{ height: "35px" }} />
                            </div>
                            <br />
                            <div class="field col-12 md:col-6">
                                <label htmlFor="date" className="block"> Effective Date </label>
                                <InputText style={{ height: "10px" }} type="date" value={effectivedate} onChange={(e) => { setEffectiveDate(e.target.value) }} /><br />
                            </div>
                            <br />
                            <div class="field col-12 md:col-6">
                                <label htmlFor="date" className="block"> Shift End Date</label>
                                <InputText style={{ height: "10px" }} type="date" value={shiftenddate} onChange={(e) => { setShiftEndDate(e.target.value) }} /><br />
                            </div>
                            <br />
                            <div class="field col-12 md:col-12">
                                <label htmlFor="name" className="block"> Repeat Every</label>
                                <Dropdown value={week} options={weeks} onChange={onWeekChange} optionLabel="name" optionValue="name" style={{ height: "35px" }} />
                            </div>
                            <br />
                            <div class="field col-12 md:col-6">
                                <label htmlFor="username1" className="block">  Schedule Chcek-In </label>
                                {/* <Calendar  value={duration} onChange={(e) => setDuration(e.value)} timeOnly hourFormat="12" style={{ height: "10px" }} /> */}
                                <input type="time" value={duration} onChange={(e) => { setDuration(e.target.value) }} /><br /><br />
                            </div>
                            <br />
                            <div class="field col-12 md:col-6">
                                <label htmlFor="name" className="block"> Schedule Check-Out </label>
                                {/* <Calendar value={duration1} onChange={(e) => setDuration1(e.value)} timeOnly hourFormat="12" style={{ height: "10px" }} /> */}
                                <input type="time" value={duration1} onChange={(e) => { setDuration1(e.target.value) }} /><br /><br />
                            </div>
                            <br /><br />
                            <div style={{ marginLeft: "130px" }}>
                                <Link to="/SchedularSetting">
                                    <Button
                                        style={{ height: "30px", width: "90px" }}
                                        label="Update"
                                        onClick={updateUser}
                                        type="button"
                                        className="p-button-outlined" />
                                    &nbsp; &nbsp;
                                    <Button
                                        style={{ height: "30px", width: "90px" }}
                                        label="Cancel"
                                        className="p-button-outlined" />
                                </Link>
                            </div>
                        </div>
                    </ScrollPanel>
                </form>
            </Dialog>
            <div style={{ overflow: 'auto' }} >
                <DataTable value={users} size="small" responsiveLayout="scroll" paginator rows={8}
                    selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)} >
                    &nbsp;
                    {/* <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column> */}
                    <Column field="name" header="Employee Name" ></Column>
                    <Column field="empid" header="Employee Id" ></Column>
                    <Column field="department" header="Department" ></Column>
                    <Column field="selectedshift" header="Shift"  ></Column>
                    <Column field="effectivedate" header="Date"  ></Column>
                    <Column field="shiftenddate" header="Shift End-Date"  ></Column>
                    <Column field="week" header="Week"  ></Column>
                    <Column field="duration" header="Time-In"  ></Column>
                    <Column field="duration1" header="Time-Out"  ></Column>
                    <Column header="Action" body={actionBodyTemplate}></Column>
                </DataTable>
            </div>

        </div>
    )
}
export default SchedularSetting;