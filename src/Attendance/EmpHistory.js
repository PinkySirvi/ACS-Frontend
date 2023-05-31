import React, { useState, useEffect, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import axios from 'axios';

const EmpHistory = () => {
    const [_id, set_Id] = useState('');
    const [name, setName] = useState("");
    const [empid, setEmpid] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [gender, setGender] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [bloodgroup, setBloodgroup] = useState("");
    const [maritalstatus, setMaritalstatus] = useState("");
    const [address, setAddress] = useState("");
    const [administrator, setAdministrator] = useState("");
    const [jobno, setJobno] = useState("");
    const [designation, setDesignation] = useState("");
    const [department, setDepartment] = useState("");
    const [joiningdate, setJoiningdate] = useState("");
    const [file, setFile] = useState();
    const [users, setUsers] = useState([])

    const [selectedProducts, setSelectedProducts] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null)

    // get Method
    useEffect(() => {
        getUsers();
    }, [])
    function getUsers() {
        fetch(`${process.env.REACT_APP_API_KEY}/userhistory`).then((result) => {
            result.json().then((resp) => {
                setUsers(resp)
            })
        })
    }
    console.warn(users)

    return (
        <div>
            <h1 style={{ marginLeft: "350px",fontFamily:"initial" }}>Employee History</h1><br/>
            <div style={{ overflow: 'auto' }} >
                <DataTable value={users} size="small" responsiveLayout="scroll" paginator rows={5}
                    selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                    globalFilter={globalFilter} >
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                    <Column field="name" header="Name" ></Column>
                    <Column field="empid" header="Id" ></Column>
                    <Column field="email" header="Email" ></Column>
                    <Column field="mobile" header="Mobile Number" ></Column>
                    <Column field="birthdate" header="DOB" ></Column>
                    <Column field="maritalstatus" header="Marital Status" ></Column>
                    <Column field="bloodgroup" header="Blood Group" ></Column>
                    <Column field="gender" header="Gender" ></Column>
                    <Column field="address" header="Address" ></Column>
                    <Column field="administrator" header="Administrator" ></Column>
                    <Column field="jobno" header="Job No" ></Column>
                    <Column field="designation" header="Designation"></Column>
                    <Column field="department" header="Department" ></Column>
                    <Column field="joiningdate" header="Joining Date" ></Column>
                </DataTable>
            </div>

        </div>
    )
}
export default EmpHistory;