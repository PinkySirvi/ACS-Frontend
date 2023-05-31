import React, { useState, useEffect, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import axios from 'axios';

const User = () => {
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
    const [globalFilter, setGlobalFilter] = useState(null);

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
    const onbgChange = (e) => {
        setBloodgroup(e.value);
    }

    const handleDownload = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_KEY}/user/download`);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'empdata.csv');
        document.body.appendChild(link);
        link.click();
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    // Post Method
    // function saveUser() {
    //     console.warn({
    //         name, empid, email, mobile, gender, birthdate, bloodgroup, maritalstatus, address, administrator, jobno, designation, department, joiningdate, file
    //     });
    //     let data = {
    //         name, empid, email, mobile, gender, birthdate, bloodgroup, maritalstatus, address, administrator, jobno, designation, department, joiningdate, file
    //     }
    //     // `${process.env.REACT_APP_API_KEY}/add`
    //     fetch(`${process.env.REACT_APP_API_KEY}/user`, {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(data)
    //     }).then((result) => {
    //         result.json().then((resp) => {
    //             console.warn("resp", resp)
    //         })
    //     })
    // }

    // Post Method
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('empid', empid);
        formData.append('email', email);
        formData.append('mobile', mobile);
        formData.append('gender', gender);
        formData.append('birthdate', birthdate);
        formData.append('bloodgroup', bloodgroup);
        formData.append('maritalstatus', maritalstatus);
        formData.append('address', address);
        formData.append('administrator', administrator);
        formData.append('jobno', jobno);
        formData.append('designation', designation);
        formData.append('department', department);
        formData.append('joiningdate', joiningdate);
        formData.append('file', file);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_KEY}/user`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);

            setName('');
            setEmpid('');
            setEmail('');
            setMobile('');
            setGender('');
            setBirthdate('');
            setBloodgroup('');
            setMaritalstatus('');
            setAddress('');
            setAdministrator('');
            setJobno('');
            setDesignation('');
            setDepartment('');
            setJoiningdate('');
            setFile(null);


            alert('File uploaded successfully!');
        } catch (error) {
            console.error(error);
            alert('Error uploading file. Please try again.');
        }
    };



    // get method  
    useEffect(() => {
        getUsers();
    }, [])
    function getUsers() {
        fetch(`${process.env.REACT_APP_API_KEY}/user`).then((result) => {
            result.json().then((resp) => {
                setUsers(resp)
            })
        })
    }
    console.warn(users)

    // delete method
    function deleteUser(user) {
        console.log("id to be delete", user);
        fetch(`${process.env.REACT_APP_API_KEY}/user/${user._id}`, {
            method: 'DELETE'
        }).then((result) => {
            result.json().then((resp) => {
                console.warn(resp)
                console.log(result);
            })
        })
    }

    //delete multiple selected rows
    const deleteMultiple = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_KEY}/user/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userIds: selectedProducts })
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error deleting users:', error);
        }
    };

    // update method
    function userData(data) {
        console.log("data", data)
        set_Id(data._id)
        setName(data.name)
        setEmpid(data.empid)
        setEmail(data.email)
        setMobile(data.mobile)
        setGender(data.gender)
        setBirthdate(data.birthdate)
        setBloodgroup(data.bloodgroup)
        setMaritalstatus(data.maritalstatus)
        setAddress(data.address)
        setAdministrator(data.administrator)
        setJobno(data.jobno)
        setDesignation(data.designation)
        setDepartment(data.department)
        setJoiningdate(data.joiningdate)
        setFile(data.file)
    }
    function updateUser(userId) {
        let item = {
            name, empid, email, mobile, gender, birthdate, bloodgroup, maritalstatus, address, administrator, jobno, designation, department, joiningdate, file
        }
        console.warn("item", item)
        fetch(`${process.env.REACT_APP_API_KEY}/user/` + _id, {
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


    const header = (
        <div className="table-header" >
            <span className="p-input-icon-left" >
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." style={{ height: "30px" }} />
            </span>
        </div>
    );

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => onClick('displayBasic')} onMouseDown={() => userData(rowData)} style={{ height: "40px", width: "40px" }} />
                &nbsp;
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => deleteUser(rowData)} style={{ height: "40px", width: "40px" }} />
            </React.Fragment>
        );
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

    return (
        <div>
            <div class="grid">

                <div class="field col-12 md:col-12" style={{ display: "flex", height: "60px" }} >
                    &nbsp;
                    <div>
                        <Button icon="pi pi-user-plus" onClick={() => onClick('displayBasic2')} style={{ backgroundColor: "lightslategray" }} />
                        <Dialog visible={displayBasic2} style={{ width: '50vw', height: "45vw" }} onHide={() => onHide('displayBasic2')} >
                            <form>

                                <div className="p-fluid grid">

                                    <div class="field col-12 md:col-6">
                                        <label htmlFor="name" className="block"> Name </label>
                                        <InputText style={{ height: "10px" }} type="text" value={name} onChange={(e) => { setName(e.target.value) }} /><br /><br />
                                    </div>

                                    <div class="field col-12 md:col-6">
                                        <label htmlFor="empid" className="block"> Id </label>
                                        <InputText style={{ height: "10px" }} type="text" value={empid} onChange={(e) => { setEmpid(e.target.value) }} /><br /><br />
                                    </div>

                                    <div class="field col-12 md:col-6">
                                        <label htmlFor="email" className="block"> Email</label>
                                        <InputText style={{ height: "10px" }} type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} /><br /><br />
                                    </div>

                                    <div class="field col-12 md:col-6">
                                        <label htmlFor="username1" className="block"> Mobile Number </label>
                                        <InputText style={{ height: "10px" }} type="text" value={mobile} onChange={(e) => { setMobile(e.target.value) }} /><br /><br />
                                    </div>

                                    <div class="field col-12 md:col-6">
                                        <label htmlFor="date" className="block"> DOB </label>
                                        <InputText style={{ height: "10px" }} type="date" value={birthdate} onChange={(e) => { setBirthdate(e.target.value) }} /><br /><br />
                                    </div>

                                    <div class="field col-12 md:col-6">Marital Status   <br />

                                        <div class="formgroup-inline">
                                            <div class="field-radiobutton">
                                                <input type="radio" name="maritalstatus" value="Married" onChange={(e) => { setMaritalstatus(e.target.value) }} />
                                                <label for="city7">Married</label>
                                                {/* </div>
                                            <div class="field-radiobutton"> */}
                                                &nbsp;  &nbsp;
                                                <input type="radio" name="maritalstatus" value="Unmarried" onChange={(e) => { setMaritalstatus(e.target.value) }} />
                                                <label for="city8">Unmarried</label>
                                            </div>
                                        </div>

                                    </div><br />

                                    <div class="field col-12 md:col-6">Blood-Group
                                        <Dropdown value={bloodgroup} options={bloodgroups} onChange={onbgChange} optionLabel="name" optionValue="name" placeholder="Select Blood-Group" style={{ height: "35px" }} />
                                    </div><br />

                                    <div class="field col-12 md:col-6">Gender
                                        <Dropdown value={gender} options={sex} onChange={ongenderChange} optionLabel="name" optionValue="name" placeholder="Select Gender" style={{ height: "35px" }} />
                                    </div><br />

                                    <div class="field col-12 md:col-6">
                                        <label htmlFor="username1" className="block"> Address </label>
                                        <InputText style={{ height: "10px" }} type="text" value={address} onChange={(e) => { setAddress(e.target.value) }} name="mobile" /><br /><br />
                                    </div>


                                    <div class="field col-12 md:col-6">Administrator  <br />

                                        <div class="formgroup-inline">
                                            <div class="field-radiobutton">
                                                <input type="radio" name="administrator" value="Yes" onChange={(e) => { setAdministrator(e.target.value) }} />
                                                <label for="city7">Yes</label>
                                                {/* </div>
                                            <div class="field-radiobutton"> */}
                                                &nbsp; &nbsp;
                                                <input type="radio" name="administrator" value="No" onChange={(e) => { setAdministrator(e.target.value) }} />
                                                <label for="city8">No</label>
                                            </div>
                                        </div>

                                    </div><br />

                                    <div style={{ fontFamily: "serif" }}>_________________________Job Info________________________</div><br />

                                    <div class="field col-12 md:col-6">
                                        <label htmlFor="name" className="block"> Job No </label>
                                        <InputText style={{ height: "10px" }} type="text" value={jobno} onChange={(e) => { setJobno(e.target.value) }} /><br /><br />
                                    </div>

                                    <div class="field col-12 md:col-6">
                                        <label htmlFor="name" className="block"> Designation </label>
                                        <InputText style={{ height: "10px" }} type="text" value={designation} onChange={(e) => { setDesignation(e.target.value) }} /><br /><br />
                                    </div>

                                    <div class="field col-12 md:col-6">
                                        <label htmlFor="name" className="block"> Department </label>
                                        <InputText style={{ height: "10px" }} type="text" value={department} onChange={(e) => { setDepartment(e.target.value) }} /><br /><br />
                                    </div>

                                    <div class="field col-12 md:col-6">
                                        <label htmlFor="date" className="block"> Joining Date </label>
                                        <InputText style={{ height: "10px" }} type="date" value={joiningdate} onChange={(e) => { setJoiningdate(e.target.value) }} /><br /><br />
                                    </div>

                                    <div class="field col-12 md:col-6">
                                        <label htmlFor="username1" className="block"> Profile Photo </label>
                                        <input type="file" id="file" onChange={handleFileChange} />
                                        {/* <img src={file}
                                            zoomSrc="file" alt="Image" width="80" height="60" preview
                                        /> */}
                                    </div>

                                    <br />
                                    <div style={{ marginLeft: "140px" }}>
                                        <Button
                                            style={{ height: "30px", width: "95px" }}
                                            label="Submit"
                                            type="button"
                                            onClick={handleSubmit}
                                            className="p-button-outlined" />
                                        &nbsp;      &nbsp;
                                        <Button
                                            style={{ height: "30px", width: "90px" }}
                                            label="Cancel"
                                            className="p-button-outlined" />
                                    </div>
                                </div>
                            </form>
                        </Dialog>
                    </div>
                    {/*For Update*/}
                    <Dialog visible={displayBasic} style={{ width: '50vw', height: "45vw" }} onHide={() => onHide('displayBasic')}>
                        <form>

                            <div className="p-fluid grid">

                                <div class="field col-12 md:col-6">
                                    <label htmlFor="name" className="block"> Name </label>
                                    <InputText style={{ height: "10px" }} type="text" value={name} onChange={(e) => { setName(e.target.value) }} /><br /><br />
                                </div>

                                <div class="field col-12 md:col-6">
                                    <label htmlFor="empid" className="block"> Id </label>
                                    <InputText style={{ height: "10px" }} type="text" value={empid} onChange={(e) => { setEmpid(e.target.value) }} /><br /><br />
                                </div>

                                <div class="field col-12 md:col-6">
                                    <label htmlFor="email" className="block"> Email</label>
                                    <InputText style={{ height: "10px" }} type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} /><br /><br />
                                </div>

                                <div class="field col-12 md:col-6">
                                    <label htmlFor="username1" className="block"> Mobile Number </label>
                                    <InputText style={{ height: "10px" }} type="text" value={mobile} onChange={(e) => { setMobile(e.target.value) }} /><br /><br />
                                </div>

                                <div class="field col-12 md:col-6">
                                    <label htmlFor="date" className="block"> DOB </label>
                                    <InputText style={{ height: "10px" }} type="date" value={birthdate} onChange={(e) => { setBirthdate(e.target.value) }} /><br /><br />
                                </div>

                                <div class="field col-12 md:col-6">Marital Status   <br />

                                    <div class="formgroup-inline">
                                        <div class="field-radiobutton">
                                            <input type="radio" name="maritalstatus" value="Married" onChange={(e) => { setMaritalstatus(e.target.value) }} />
                                            <label for="city7">Married</label>
                                            &nbsp;  &nbsp;
                                            <input type="radio" name="maritalstatus" value="Unmarried" onChange={(e) => { setMaritalstatus(e.target.value) }} />
                                            <label for="city8">Unmarried</label>
                                        </div>
                                    </div>

                                </div>
                                <br />
                                <div class="field col-12 md:col-6">Blood-Group
                                    <Dropdown value={bloodgroup} options={bloodgroups} onChange={onbgChange} optionLabel="name" optionValue="name" placeholder="Select Blood-Group" style={{ height: "35px" }} />
                                </div>
                                <br />
                                <div class="field col-12 md:col-6">Gender
                                    <Dropdown value={gender} options={sex} onChange={ongenderChange} optionLabel="name" optionValue="name" placeholder="Select Gender" style={{ height: "35px" }} />
                                </div>
                                <br />
                                <div class="field col-12 md:col-6">
                                    <label htmlFor="username1" className="block"> Address </label>
                                    <InputText style={{ height: "10px" }} type="text" value={address} onChange={(e) => { setAddress(e.target.value) }} name="mobile" /><br /><br />
                                </div>


                                <div class="field col-12 md:col-6">Administrator  <br />

                                    <div class="formgroup-inline">
                                        <div class="field-radiobutton">
                                            <input type="radio" name="administrator" value="Yes" onChange={(e) => { setAdministrator(e.target.value) }} />
                                            <label for="city7">Yes</label>
                                            &nbsp;   &nbsp;
                                            <input type="radio" name="administrator" value="No" onChange={(e) => { setAdministrator(e.target.value) }} />
                                            <label for="city8">No</label>
                                        </div>
                                    </div>

                                </div>

                                <div style={{ fontFamily: "serif" }}>_________________________Job Info________________________</div><br />

                                <div class="field col-12 md:col-6">
                                    <label htmlFor="name" className="block"> Job No </label>
                                    <InputText style={{ height: "10px" }} type="text" value={jobno} onChange={(e) => { setJobno(e.target.value) }} /><br /><br />
                                </div>

                                <div class="field col-12 md:col-6">
                                    <label htmlFor="name" className="block"> Designation </label>
                                    <InputText style={{ height: "10px" }} type="text" value={designation} onChange={(e) => { setDesignation(e.target.value) }} /><br /><br />
                                </div>

                                <div class="field col-12 md:col-6">
                                    <label htmlFor="name" className="block"> Department </label>
                                    <InputText style={{ height: "10px" }} type="text" value={department} onChange={(e) => { setDepartment(e.target.value) }} /><br /><br />
                                </div>

                                <div class="field col-12 md:col-6">
                                    <label htmlFor="date" className="block"> Joining Date </label>
                                    <InputText style={{ height: "10px" }} type="date" value={joiningdate} onChange={(e) => { setJoiningdate(e.target.value) }} /><br /><br />
                                </div>

                                <div class="field col-12 md:col-6">
                                    <label htmlFor="username1" className="block"> Profile Photo </label>
                                    <input type="file" id="file" onChange={handleFileChange} />
                                    <img src={file}
                                        zoomSrc="file" alt="Image" width="80" height="60" preview
                                    />
                                </div><br />
                                <div style={{ marginLeft: "140px" }}>
                                    <Button
                                        style={{ height: "30px", width: "95px" }}
                                        label="Update"
                                        type="button"
                                        onClick={updateUser}
                                        className="p-button-outlined" />
                                    &nbsp;      &nbsp;
                                    <Button
                                        style={{ height: "30px", width: "90px" }}
                                        label="Cancel"
                                        className="p-button-outlined" />
                                </div>
                            </div>
                        </form>
                    </Dialog>
                    {/*For Update*/}

                    &nbsp;
                    <div>
                        <Button icon="pi pi-download" onClick={handleDownload} style={{ backgroundColor: "lightslategray" }} />
                    </div>
                    &nbsp;
                    <div>
                        <Button icon="pi pi-trash" style={{ backgroundColor: "lightslategray" }} onClick={() => deleteMultiple(selectedProducts)} />&nbsp;
                    </div>

                </div>

                <div style={{ overflow: 'auto' }} >
                    <DataTable value={users} size="small" responsiveLayout="scroll" paginator rows={5}
                        selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                        globalFilter={globalFilter} header={header} >
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
                        <Column field="file" header="Profile Photo" body={imageBodyTemplate}
                        //  style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "150px", minWidth: "50px" }}
                        ></Column>
                        <Column body={actionBodyTemplate} header="Action" exportable={false} style={{ minWidth: '8rem' }}></Column>
                    </DataTable>
                </div>

            </div>
        </div>
    )
}
export default User;