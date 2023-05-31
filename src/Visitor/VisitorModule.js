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
// import {TimePicker} from 'primereact/timepicker';
import validator from 'validator';
import * as XLSX from 'xlsx';
import { Link } from 'react-router-dom';


const FormVisitor = () => {
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

    const imageBodyTemplate = (rowData) => {
        return (
            rowData.file ? (
                <span className="checkmark">&#10003;</span>
            ) : (
                <span className="cross">&#10007;</span>
            )
        )
    }

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

    const sex = [
        { name: 'Male' },
        { name: 'Female' },
    ];
    const ongenderChange = (e) => {
        setGender(e.value);
    }

    const bloodgroups = [
        { name: 'O +ve' },
        { name: 'A +ve' },
        { name: 'A -ve' },
        { name: 'B +ve' },
        { name: "B -ve" }
    ];

    const [isOpen, setIsOpen] = useState(false);
    const handleDropdownToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionSelect = (path) => {
        setIsOpen(false);
        // Additional logic can be added here before navigating
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-eye" className="p-button-rounded mr-2" onClick={() => onClick('displayBasic')}
                    onMouseDown={() => userData(rowData)} style={{ backgroundColor: "lightslategray", height: "30px", width: "30px" }} />
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

    const handleDownload = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_KEY}/visitor/download`);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'visitors.csv');
        document.body.appendChild(link);
        link.click();
    };

    // Post Method
    function saveUser() {
        console.warn({
            vname, vid, govtid, emailError, mobile, birthdate, gender, address, company, designation, department, purpose, items, cardno, file, checkindate, checkintime, checkouttime, gatepass
        });
        let data = {
            vname, vid, govtid, emailError, mobile, birthdate, gender, address, company, designation, department, purpose, items, cardno, file, checkindate, checkintime, checkouttime, gatepass

        }
        fetch(`${process.env.REACT_APP_API_KEY}/visitors`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((result) => {
            result.json().then((resp) => {
                console.warn("resp", resp)
            })
        })
    }

    // get method  
    useEffect(() => {
        getUsers();
    }, [])
    function getUsers() {
        fetch(`${process.env.REACT_APP_API_KEY}/visitors`).then((result) => {
            result.json().then((resp) => {
                setUsers(resp)
            })
        })
    }
    console.warn(users)


    //delete multiple selected rows
    const deleteMultiple = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_KEY}/visitors`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ visitorIds: selectedProducts })
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error deleting Machines:', error);
        }
    };

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
            <div class="field col-12 md:col-12" style={{ display: "flex" }} >
                &nbsp;
                <div>
                    <Button icon="pi pi-user-plus" onClick={() => onClick('displayBasic2')} style={{ backgroundColor: "lightslategray" }} />
                    <Dialog visible={displayBasic2} style={{ width: '50vw', height: "40vw" }} onHide={() => onHide('displayBasic2')} >

                        <TabView>
                            <TabPanel header="visitor's Info">
                                <form onSubmit={handleSubmit}>
                                    <br />
                                    <ScrollPanel style={{ height: '50vh', color: "gray" }}>
                                        <div className="p-fluid grid">

                                            <div class="field col-12 md:col-6">
                                                <label htmlFor="vname" className="block"> Visitor Name </label>
                                                <InputText style={{ height: "10px" }} type="text" value={vname} onChange={(e) => { setVname(e.target.value) }} required /><br /><br />
                                            </div>

                                            <div class="field col-12 md:col-6">
                                                <label htmlFor="vid" className="block">Visitor Id </label>
                                                <InputText style={{ height: "10px" }} type="text" value={vid} onChange={(e) => { setVid(e.target.value) }} required /><br /><br />
                                            </div>

                                            <div class="field col-12 md:col-6">
                                                <label htmlFor="govtid" className="block">Govt.Id </label>
                                                <InputText style={{ height: "10px" }} type="text" value={govtid} onChange={(e) => { setGovtid(e.target.value) }} required /><br /><br />
                                            </div>

                                            <div class="field col-12 md:col-6">
                                                <label htmlFor="email" className="block"> Email</label>
                                                <InputText style={{ height: "10px" }} type="text" id="userEmail" onChange={(e) => validateEmail(e)} required /><br /><br />
                                                <span style={{ color: 'red' }}>{emailError}</span>
                                            </div>

                                            <div class="field col-12 md:col-6">
                                                <label htmlFor="username1" className="block"> Mobile Number </label>
                                                <InputText style={{ height: "10px" }} type="text" value={mobile} onChange={(e) => { setMobile(e.target.value) }} /><br /><br />
                                            </div>

                                            <div class="field col-12 md:col-6">
                                                <label htmlFor="date" className="block"> DOB </label>
                                                <InputText style={{ height: "10px" }} type="date" value={birthdate} onChange={(e) => { setBirthdate(e.target.value) }} /><br /><br />
                                            </div>

                                            <div class="field col-12 md:col-6">Gender
                                                <Dropdown value={gender} options={sex} onChange={ongenderChange} optionLabel="name" optionValue="name" placeholder="Select Gender"
                                                    style={{ height: "40px" }} /><br />
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

                                            <div class="field col-12 md:col-6">
                                                <label htmlFor="name" className="block"> Carried Items</label>
                                                <InputText style={{ height: "10px" }} type="text" value={items} onChange={(e) => { setItems(e.target.value) }} /><br /><br />
                                            </div>

                                            <div class="field col-12 md:col-6">
                                                <label htmlFor="name" className="block"> Card No</label>
                                                <InputText style={{ height: "10px" }} type="text" value={cardno} onChange={(e) => { setCardno(e.target.value) }} /><br /><br />
                                            </div>

                                        </div>
                                    </ScrollPanel>
                                </form>
                            </TabPanel>

                            <TabPanel header="Visiting Info">
                                <form>
                                    <br />
                                    <ScrollPanel style={{ height: '50vh', color: "gray" }}>
                                        <div className="p-fluid grid">

                                            <div class="field col-12 md:col-12">
                                                <label htmlFor="username1" className="block"> Profile Photo </label>
                                                <input type="file" onChange={handleChange} enctype="multipart/form-data" />
                                                <img src={file} zoomSrc="file" alt="Image" width="80" height="60" preview /><br /><br />
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

                                            <div style={{ marginLeft: "140px" }}>
                                                <Button
                                                    style={{ height: "30px", width: "90px" }}
                                                    label="Submit"
                                                    onClick={saveUser}
                                                    type="button"
                                                    className="p-button-outlined" />
                                                &nbsp;
                                                <Button
                                                    style={{ height: "30px", width: "90px" }}
                                                    label="Cancel"
                                                    className="p-button-outlined" />
                                            </div>

                                        </div>
                                    </ScrollPanel>

                                </form>
                            </TabPanel>

                        </TabView>

                    </Dialog>
                </div>
                <div class="grid">
                    <div class="field col-12 md:col-12" style={{ display: "flex" }}>
                        {/* <Button icon="pi pi-external-link" onClick={() => onClick('displayBasic')} /> */}
                        <Dialog visible={displayBasic} style={{ width: '50vw' }} onHide={() => onHide('displayBasic')}>
                            <Button icon="pi pi-print" onClick={() => printForm(selectedProducts)} style={{ backgroundColor: "lightslategray", height: "10px", width: "30px" }}></Button>

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

                &nbsp;
                <div>
                    <Button icon="pi pi-print" onClick={() => printForm(selectedProducts)} style={{ backgroundColor: "lightslategray" }}></Button>
                </div>
                &nbsp;
                <div>
                    <Button icon="pi pi-trash" style={{ backgroundColor: "lightslategray" }} onClick={() => deleteMultiple(selectedProducts)} />&nbsp;
                </div>

                <div>
                    <Button icon="pi pi-file" onClick={handleDropdownToggle} style={{ backgroundColor: "lightslategray", marginLeft: "620px" }} >
                    </Button>
                    {isOpen && (
                        <ul className="dropdown-menu">

                            <li onClick={() => handleOptionSelect('/History')}>
                                <Link to="/History">
                                    <button name="Logs" style={{ color: 'black', border: '1px solid', marginLeft: "620px" }}>
                                        History
                                    </button>
                                </Link>
                            </li>
                            <li onClick={() => handleOptionSelect('/Details')}>
                                <Link to="/Details">
                                    <button name="Logs" style={{ color: 'black', border: '1px solid', marginLeft: "620px" }}>
                                        Details
                                    </button>
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>
                &nbsp;
                <div>
                    <Button icon="pi pi-upload" onClick={handleDownload} style={{ backgroundColor: "lightslategray" }} />
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
                    <Column header="Action" body={actionBodyTemplate}></Column>
                </DataTable>
            </div>
        </div>
    )
}
export default FormVisitor;