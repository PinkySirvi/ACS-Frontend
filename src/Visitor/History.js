import React, { useState, useEffect, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Link } from 'react-router-dom';

const History = () => {
    const [_id, set_Id] = useState('');
    const [vname, setVname] = useState("");
    const [vid, setVid] = useState("");
    const [govtid, setGovtid] = useState("");
    const [emailError, setEmailError] = useState('')
    const [mobile, setMobile] = useState("");
    const [gender, setGender] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [address, setAddress] = useState("");
    const [company, setCompany] = useState("");
    const [designation, setDesignation] = useState("");
    const [department, setDepartment] = useState("");
    const [purpose, setPurpose] = useState();
    const [items, setItems] = useState();
    const [status, setStatus] = useState();
    const [cardno, setCardno] = useState();
    const [users, setUsers] = useState([])

    const [file, setFile] = useState();
    const [checkindate, setCheckInDate] = useState("");
    const [duration, setDuration] = useState("");
    const [checkintime, setCheckInTime] = useState("");
    const [checkouttime, setCheckOutTime] = useState("");
    const [gatepass, setGatepass] = useState("");
    const [selectedProducts, setSelectedProducts] = useState(null);

    const [displayBasic2, setDisplayBasic2] = useState(false);
    const [displayBasic, setDisplayBasic] = useState(false);
    const [position, setPosition] = useState('center');

    const dialogFuncMap = {
        'displayBasic2': setDisplayBasic2,
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

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-eye" className="p-button-rounded mr-2" onClick={() => onClick('displayBasic')}
                    onMouseDown={() => userData(rowData)} style={{ backgroundColor: "lightslategray", height: "40px", width: "40px" }} />
            </React.Fragment>
        );
    }

    const printForm = (selectedProducts) => {
        window.print(selectedProducts);
    }

    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }


    // get method  
    useEffect(() => {
        getUsers();
    }, [])
    function getUsers() {
        fetch(`${process.env.REACT_APP_API_KEY}/history`).then((result) => {
            result.json().then((resp) => {
                setUsers(resp)
            })
        })
    }
    console.warn(users)

    function userData(data) {
        console.log("data", data)
        setFile(data.file)
        setVid(data.vid)
        setVname(data.vname)
        setMobile(data.mobile)
        setAddress(data.address)
        setCompany(data.company)
        setDesignation(data.designation)
        setDepartment(data.department)
        setPurpose(data.purpose)
        setGatepass(data.gatepass)
        setCheckInDate(data.checkindate)
        setCheckInTime(data.checkintime)
        setCheckOutTime(data.checkouttime)
    }

    return (
        <div class="grid">
            <h1 style={{ marginLeft: "400px" }}>Visitor History</h1>
            &nbsp;     &nbsp;       &nbsp;        &nbsp;      &nbsp;      &nbsp;      &nbsp;
            <Link to="/Visitormodule"><Button icon="pi pi-arrow-left" style={{ backgroundColor: "lightslategray", height: "20px" }} > </Button></Link>

            <div class="field col-12 md:col-12" style={{ display: "flex" }} >

                <div class="grid">
                    <div class="field col-12 md:col-12" style={{ display: "flex" }}>
                        <Dialog visible={displayBasic} style={{ width: '50vw' }} onHide={() => onHide('displayBasic')}>
                            <Button icon="pi pi-print" onClick={() => printForm(selectedProducts)} style={{ backgroundColor: "lightslategray", height: "10px" }}></Button>

                            <form onSubmit={handleSubmit}>
                                <br />
                                <ScrollPanel style={{ height: '50vh', color: "gray" }}>
                                    <div className="p-fluid grid">

                                        <div class="field col-12 md:col-12">
                                            <label htmlFor="username1" className="block"> Profile Photo </label>
                                            <input type="file" onChange={handleChange} enctype="multipart/form-data" />
                                            <img src={file} zoomSrc="file" alt="Image" width="80" height="60" preview /><br /><br />
                                        </div>

                                        <div class="field col-12 md:col-4">
                                            <label htmlFor="vname" className="block"> Visitor Name </label>
                                            <InputText style={{ height: "10px" }} type="text" value={vname} onChange={(e) => { setVname(e.target.value) }} required /><br /><br />
                                        </div>

                                        <div class="field col-12 md:col-4">
                                            <label htmlFor="vid" className="block">Visitor Id </label>
                                            <InputText style={{ height: "10px" }} type="text" value={vid} onChange={(e) => { setVid(e.target.value) }} required /><br /><br />
                                        </div>

                                        <div class="field col-12 md:col-4">
                                            <label htmlFor="username1" className="block"> Mobile Number </label>
                                            <InputText style={{ height: "10px" }} type="text" value={mobile} onChange={(e) => { setMobile(e.target.value) }} /><br /><br />
                                        </div>

                                        <div class="field col-12 md:col-6">
                                            <label htmlFor="username1" className="block"> Address </label>
                                            <InputText style={{ height: "10px" }} type="text" value={address} onChange={(e) => { setAddress(e.target.value) }} name="mobile" /><br /><br />
                                        </div>


                                        <div class="field col-12 md:col-6">
                                            <label htmlFor="name" className="block"> Company </label>
                                            <InputText style={{ height: "10px" }} type="text" value={company} onChange={(e) => { setCompany(e.target.value) }} required /><br /><br />
                                        </div>

                                        <div class="field col-12 md:col-6">
                                            <label htmlFor="name" className="block"> Designation </label>
                                            <InputText style={{ height: "10px" }} type="text" value={designation} onChange={(e) => { setDesignation(e.target.value) }} required /><br /><br />
                                        </div>

                                        <div class="field col-12 md:col-6">
                                            <label htmlFor="name" className="block"> Department </label>
                                            <InputText style={{ height: "10px" }} type="text" value={department} onChange={(e) => { setDepartment(e.target.value) }} required /><br /><br />
                                        </div>

                                        <div class="field col-12 md:col-6">
                                            <label htmlFor="name" className="block"> Purpose</label>
                                            <InputText style={{ height: "10px" }} type="text" value={purpose} onChange={(e) => { setPurpose(e.target.value) }} required /><br /><br />
                                        </div>


                                        <div class="field col-12 md:col-4">
                                            <label htmlFor="date" className="block"> Check-In date</label>
                                            <InputText style={{ height: "10px" }} type="date" value={checkindate} onChange={(e) => { setCheckInDate(e.target.value) }} /><br /><br />
                                        </div>

                                        <div class="field col-12 md:col-4">
                                            <label htmlFor="username1" className="block"> Check-In time </label>
                                            <input type="time" value={checkintime} onChange={(e) => { setCheckInTime(e.target.value) }} /><br /><br />
                                        </div>

                                        <div class="field col-12 md:col-4">
                                            <label htmlFor="username1" className="block"> Check-Out time </label>
                                            <input type="time" value={checkouttime} onChange={(e) => { setCheckOutTime(e.target.value) }} /><br /><br />
                                        </div>

                                        <div class="field col-12 md:col-4">
                                            <label htmlFor="name" className="block"> GatePass</label><br />
                                            <InputText style={{ height: "10px" }} type="text" value={gatepass} onChange={(e) => { setGatepass(e.target.value) }} /><br /><br />
                                        </div>
                                    </div>
                                </ScrollPanel>

                            </form>

                        </Dialog>
                    </div>
                </div>

            </div>  <br />
            <div >
                <DataTable value={users} size="small" responsiveLayout="scroll" paginator rows={8}
                    selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)} >
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                    <Column field="vid" header="Visitor Id" ></Column>
                    <Column field="vname" header="Visitor Name" ></Column>
                    <Column field="cardno" header="Card No"></Column>
                    <Column field="checkindate" header=" Check-In date" ></Column>
                    <Column field="checkintime" header=" Check-In time" ></Column>
                    <Column field="checkouttime" header=" Check-Out time" ></Column>
                    <Column header="action" body={actionBodyTemplate}></Column>
                </DataTable>
            </div>
        </div>
    )
}
export default History;