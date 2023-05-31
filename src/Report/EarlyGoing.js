import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Calendar } from 'primereact/calendar';
import { Column } from 'primereact/column';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import axios from 'axios';

const EarlyGoing= () => {
    const [data, setData] = useState([]);
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
        fetch(`${process.env.REACT_APP_API_KEY}/earlygoingreport`).then((result) => {
            result.json().then((resp) => {
                setUsers(resp)
            })
        })
    }
    console.warn(users)


    return (
        <div>
            <div style={{ fontFamily: "sans-serif" }}> <h2><center>EARLY GOING REPORT</center></h2> </div>

            {/* <div class="grid">
                <div class="col-12 md:col-6 lg:col-6" style={{ float: "right", marginTop: "30px" }}>
                    <Button icon="pi pi-download" style={{ height: "10px", width: "25px", backgroundColor: "lightslategray" }}
                        onClick={handleDownload} />
                </div>
            </div> */}

            <DataTable value={users} paginator rows={10}>
                <Column field="empid" header="EmpId" />
                <Column field="name" header="EmpName" />
                <Column field="designation" header="Designation"></Column>
                <Column field="department" header="Department"></Column>
                <Column field="date" header="Date"></Column>
                <Column field="shiftcheckout" header="Shift Check-Out"></Column>
                <Column field="outtime" header="Check-In"></Column>
                <Column field="shift" header="Shift"></Column>
            </DataTable>

        </div>
    );
}

export default EarlyGoing;