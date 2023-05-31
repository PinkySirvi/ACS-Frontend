import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import 'primeicons/primeicons.css';
import { Dropdown } from 'primereact/dropdown';

const LeavesCopy = () => {

    const [employeename, setEmployeename] = useState('');
    const [leavetype, setLeavetype] = useState(null);
    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);
    const [reason, setReason] = useState('');

    const leaves = [
        { name: 'Medical Leave' },
        { name: 'Casual Leave' },
        { name: 'Loss of Pay' },
        { name: 'Others' }
    ];
    const onLeaveChange = (e) => {
        setLeavetype(e.value);
    }


    // post method
    function saveUser() {
        console.warn({ employeename, leavetype, from, to, reason });
        let data = { employeename, leavetype, from, to, reason }
        fetch(`${process.env.REACT_APP_API_KEY}/leaves`, {
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
        <div>
            <h2>Leaves</h2>

            <br />
            <div className="grid">
                <div class="col-12 md:col-6 lg:col-3">
                    <Card title="Annual Leaves" style={{ backgroundColor: "white", height: "140px", fontFamily: "serif" }}>
                        <p>12</p>
                    </Card>
                </div>

                <div class="col-12 md:col-6 lg:col-3">
                    <Card title="Medical Leaves" style={{ backgroundColor: "white", height: "140px", fontFamily: "serif" }}>
                        <p>3</p>
                    </Card>
                </div>


                <div class="col-12 md:col-6 lg:col-3">
                    <Card title="Paid Leaves" style={{ backgroundColor: "white", height: "140px", fontFamily: "serif" }}>
                        <p>4</p>
                    </Card>
                </div>


                <div class="col-12 md:col-6 lg:col-3">
                    <Card title="Other Leaves" style={{ backgroundColor: "white", height: "140px", fontFamily: "serif" }}>
                        <p>5</p>
                    </Card>
                </div>
            </div>
            <br />

            {/* MIDDLE PART */}
          
            <div style={{ marginLeft: "150px" }}>
               
                    <div class="p-fluid grid">
                        <div class="col-5">
                            <label>Employee Name</label>
                            <InputText id="inputtext" value={employeename} onChange={(e) => setEmployeename(e.target.value)} />
                        </div>

                        <div class="col-5 col-offset-0.5">
                            <label>Leave Type</label>
                            <Dropdown value={leavetype} options={leaves} onChange={onLeaveChange} optionLabel="name" optionValue="name" placeholder="Select Here....." />
                        </div>
                    </div>

                    <div class="p-fluid grid">
                        <div class="col-5">
                            <label>From</label>
                            <InputText  type="date" value={from} onChange={(e) => { setFrom(e.target.value) }} />
                        </div>

                        <div class="col-5 col-offset-0.5">
                            <label>To</label>
                            <InputText type="date" value={to} onChange={(e) => { setTo(e.target.value) }} />
                        </div>
                    </div>

                    <div class="col-7 col-offset-1" >
                        <label>Reason</label>
                        <InputText id="inputtext" value={reason} onChange={(e) => setReason(e.target.value)} />
                    </div>

                    <div>
                        <span>
                            <Button label="Submit" aria-label="Submit" onClick={saveUser} style={{ height: "2.5rem", width: "7rem", marginRight: "100px" }} />
                        </span>
                    </div>

              
             </div>
        </div>



    );
};
export default LeavesCopy;

