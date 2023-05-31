import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Calendar } from 'primereact/calendar';
import { Column } from 'primereact/column';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import axios from 'axios';

const PunchTime = () => {
    const [month, setMonth] = useState(new Date());
    const [empid, setEmpid] = useState('');
    const [users, setUsers] = useState([]);

    const handleDownload = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_KEY}/download`);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'empdata.csv');
        document.body.appendChild(link);
        link.click();
    };

    useEffect(() => {
        getUsers();
    }, [])
    function getUsers() {
        fetch(`${process.env.REACT_APP_API_KEY}/punchtimereport`).then((result) => {
            result.json().then((resp) => {
                setUsers(resp)
            })
        })
    }
    console.warn(users)

    return (
        <div>
            <div style={{ fontFamily: "sans-serif" }}> <h2><center>PUNCH-TIME REPORT</center></h2> </div>

            <DataTable value={users} paginator rows={10}>
                <Column field="empid" header="EmpId" />
                <Column field="name" header="EmpName" />
                <Column field="date" header="Date"></Column>
                <Column field="shift" header="Shift"></Column>
                <Column field="shiftstarttime" header="Shift Start Time"></Column>
                <Column field="shiftendtime" header="Shift End Time"></Column>
                <Column field="intime" header="Punch-In"></Column>
                <Column field="outtime" header="Punch-Out"></Column>
                <Column field="totaltime" header="Total Working Hrs"></Column>
            </DataTable>

        </div>
    );
}

export default PunchTime;