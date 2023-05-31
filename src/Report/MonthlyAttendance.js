
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Calendar } from 'primereact/calendar';
import { Column } from 'primereact/column';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import axios from 'axios';

const Attendance = () => {
    const [data, setData] = useState([]);
    const [month, setMonth] = useState(new Date());
    const [empid, setEmpid] = useState('');

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
        fetchData();
    }, [month, empid]);

    const fetchData = async () => {
        const monthNumber = month.getMonth() + 1;
        const yearNumber = month.getFullYear();
        const response = await axios.get(`${process.env.REACT_APP_API_KEY}/empdata`);
        // const response = await axios.get(`${process.env.REACT_APP_API_KEY}/empdata/monthly?month=${monthNumber}&year=${yearNumber}&empid=${empid}`);
        setData(response.data);
    }

    const handleMonthChange = (e) => {
        setMonth(e.value);
    }

    const handleEmpidChange = (e) => {
        setEmpid(e.target.value);
    }

    const dateBodyTemplate = (rowData) => {
        return (
            <span>{new Date(rowData.date).toLocaleDateString()}</span>
        );
    }

    return (
        <div>
            <TabView className="tabview-header-icon">

                <TabPanel header="DAILY REPORT"><br />
                    <div class="grid" style={{ display: "flex" }}>
                        &nbsp;  &nbsp;       <div >
                            <label>Month:</label><br />
                            <Calendar value={month} onChange={handleMonthChange} view="month" dateFormat="mm/yy" showButtonBar style={{ height: "40px", width: "150px" }} />
                        </div>
                        &nbsp;
                        <div>
                            <label>Employee ID:</label><br />
                            <input type="text" value={empid} onChange={handleEmpidChange} style={{ height: "40px", width: "150px" }} />
                        </div>

                        <div style={{ float: "right", marginTop: "30px", marginLeft: "500px" }}>
                            <Button icon="pi pi-download" style={{ height: "10px", width: "25px", backgroundColor: "lightslategray" }}
                                onClick={handleDownload} />
                        </div>
                    </div>
                    <br />
                    <DataTable value={data} paginator rows={10}>
                        <Column field="empid" header="Id" />
                        <Column field="name" header="Name" />
                        <Column field="date" header="Date" body={dateBodyTemplate} />
                        <Column field="intime" header="In Time"></Column>
                        <Column field="outtime" header="Out Time"></Column>
                        <Column field="totaltime" header="Total Time"></Column>
                        <Column field="totalot" header="Overtime"></Column>
                        <Column field="selectedshift" header="Shift"></Column>
                    </DataTable>
                </TabPanel>
            </TabView>
        </div>
    );
}

export default Attendance;