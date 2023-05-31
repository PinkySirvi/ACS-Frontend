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
import axios from 'axios';

const SchedularSetting = () => {
    const [_id, set_Id] = useState('');
    const [users, setUsers] = useState([])

    const [name, setName] = useState("");
    const [empid, setEmpid] = useState("");
    const [email, setEmail] = useState("");
    const [jobno, setJobno] = useState("");
    const [department, setDepartment] = useState("");
    const [joiningdate, setJoiningdate] = useState("");
    const [message, setMessage] = useState('');

    const [effectivedate, setEffectiveDate] = useState("");
    const [shiftenddate, setShiftEndDate] = useState("");
    const [selectedshift, setSelectedshift] = useState(null);
    const [duration, setDuration] = useState("");
    const [duration1, setDuration1] = useState("");
    const [week, setWeek] = useState("");

    const [selectedProducts, setSelectedProducts] = useState(null);
    const [displayBasic, setDisplayBasic] = useState(false);
    const [position, setPosition] = useState('center');
    const [userData, setUserData] = useState([]);


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

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    // }

    // // Post Method
    // function saveUser() {
    //     console.warn({
    //         name, empid, email, jobno, department, joiningdate, selectedshift, effectivedate, shiftenddate, week, duration, duration1
    //     });
    //     let data = {
    //         name, empid, email, jobno, department, joiningdate, selectedshift, effectivedate, shiftenddate, week, duration, duration1
    //     }
    //     fetch(`${process.env.REACT_APP_API_KEY}/schedules`, {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //                         body: JSON.stringify({ leavesIds: selectedProducts })
    //     }).then((result) => {
    //         result.json().then((resp) => {
    //             console.warn("resp", resp)
    //         })
    //     })
    // }

    // // get method  
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

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`${process.env.REACT_APP_API_KEY}/schedules`, {
            selectedUsers: selectedProducts,
            selectedshift: selectedshift,
            effectivedate: effectivedate,
            shiftenddate: shiftenddate,
            week: week,
            duration: duration,
            duration1: duration1
        })
            .then(response => {
                setMessage('Schedule added successfully');
                setSelectedProducts([]);
                setSelectedshift('');
                setEffectiveDate('');
                setShiftEndDate('');
                setWeek('');
                setDuration('');
                setDuration1('');
            })
            .catch(error => {
                console.error(error);
                setMessage('Failed to add schedule');
            });
    }


    return (

        <div>
            <div>
                &nbsp;      &nbsp;       &nbsp;      &nbsp;      &nbsp;       &nbsp;     &nbsp;
                <Button label="Add Schedule" onClick={() => onClick('displayBasic')} style={{ backgroundColor: "lightslategray", height: "20px" }} />
                <Dialog visible={displayBasic} style={{ width: '50vw' }} onHide={() => onHide('displayBasic')}>
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
                                            label="Add"
                                            onClick={handleSubmit}
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
            </div>

            <br />
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
        </div>
    )
}
export default SchedularSetting;

