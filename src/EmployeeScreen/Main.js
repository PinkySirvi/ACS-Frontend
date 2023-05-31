import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { Router, useParams } from 'react-router-dom';
import 'primeicons/primeicons.css';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';
import { InputTextarea } from 'primereact/inputtextarea';
// import { useDeprecatedAnimatedState } from 'framer-motion';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Dialog } from 'primereact/dialog';
import { Link } from "react-router-dom";


const Main = () => {
    const [displayBasic, setDisplayBasic] = useState(false);
    const [position, setPosition] = useState('center');

    const [employee, setEmployee] = useState(null);
    const [id, setId] = useState('');
    const { empId } = useParams();

    // for Request page
    //   const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [query, setQuery] = useState('');
    const [reason, setReason] = useState('');
    const [date3, setDate3] = useState(null);

    const dialogFuncMap = {
        'displayBasic': setDisplayBasic
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

    const handleChange = (event) => {
        setId(event.target.value);
    };
// for Employeedata
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_KEY}/empdata`)
            .then(response => {
                console.log(response, "data is print");
                setEmployee(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    // for request page
    function saveUser() {
        console.warn({ id, name, email, date3, query, reason });
        let data = { id, name, email, date3, query, reason }
        fetch(`${process.env.REACT_APP_API_KEY}/request`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)


        }).then((result) => {
            // console.warn("result",result);
            result.json().then((resp) => {
                console.warn("resp", resp)
            })
        })
    }

    return (
        <div class="grid">
            {/* <h2 >Hello User</h2> */}
            <div class="field col-12 md:col-12" style={{ display: "flex" }} >
                <div>
                    <Button icon="pi pi-external-link" onClick={() => onClick('displayBasic')} style={{ backgroundColor: "lightslategray" }} />
                    <Dialog header="Attendance Request" visible={displayBasic} style={{ width: '50vw', height: "40vw" }} onHide={() => onHide('displayBasic')}>

                        <div className="p-fluid grid">
                            <ScrollPanel style={{ height: '50vh', color: "gray" }}>
                                <div class="field col-12 md:col-6">
                                    <label>  ID  </label>  <br />
                                    <input type="text" value={id} onChange={(e) => { setId(e.target.value) }} style={{ height: "30px" }} /><br />
                                </div>

                                <div class="field col-12 md:col-6">
                                    <label>  NAME   </label><br />
                                    <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} style={{ height: "30px" }} /><br />
                                </div>

                                <div class="field col-12 md:col-6">
                                    <label>  E-mail    </label><br />
                                    <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} style={{ height: "30px" }} /><br />
                                </div>

                                <div class="field col-12 md:col-6">
                                    <label style={{ fontFamily: "serif" }}> DATE </label>  <br />
                                    <input style={{ height: "33px" }} type="date" value={date3} onChange={(e) => { setDate3(e.target.value) }} /><br /><br />
                                </div>

                                <div class="field col-12 md:col-6">
                                    <label>  QUERY    </label><br />
                                    <InputTextarea value={query} onChange={(e) => setQuery(e.target.value)} rows={3} /><br />
                                </div>

                                <div class="field col-12 md:col-6">
                                    <label>  REASON    </label><br />
                                    <InputTextarea value={reason} onChange={(e) => setReason(e.target.value)} rows={3} /><br />
                                </div>

                                <div class="field col-12 md:col-6">
                                    <Button label="SEND" onClick={saveUser} style={{ height: '35px', width: '90px', marginLeft: "110px" }} /><br />
                                </div>
                            </ScrollPanel>
                        </div>
                    </Dialog>
                </div>
                &nbsp;
                <Link to="/HolidaysCopy"><Button label="Holidays" style={{ backgroundColor: "lightslategray" }}></Button></Link>
                &nbsp;
                <Link to="/LeavesCopy"><Button label="Leaves" style={{ backgroundColor: "lightslategray" }} ></Button></Link>
                &nbsp;
                <Link to="/Resign"> <Button label="Resign" style={{ backgroundColor: "lightslategray" }}></Button></Link>

            </div>
            <br />
            <div>
                <DataTable value={employee} responsiveLayout="scroll" paginator rows={7} >
                    <Column field="empid" header="EmpId"></Column>
                    <Column field="name" header="EmpName"></Column>
                    <Column field="date" header="Date"></Column>
                    <Column field="intime" header="In-Time"></Column>
                    <Column field="outtime" header="Out-Time"></Column>
                    <Column field="totaltime" header="Total-Time"></Column>
                    <Column field="overtime" header="Overtime"></Column>
                    <Column field="shift" header="Shift"></Column>
                </DataTable>
            </div>
        </div>
    );
};

export default Main;