
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

const Holidays = () => {
    const [users, setUsers] = useState('');
    const [srno, setSrno] = useState('');
    const [_id, set_Id] = useState('');
    const [occasion, setOccasion] = useState('');
    const [day, setDay] = useState('');
    const [date, setDate] = useState('');
    const [displayPosition, setDisplayPosition] = useState(false);
    const [displayBasic, setDisplayBasic] = useState(false);
    const [position, setPosition] = useState('center');

    const days = [
        { name: 'Monday' },
        { name: 'Tuesday' },
        { name: 'Wednesday' },
        { name: 'Thursday' },
        { name: 'Friday' },
        { name: "Saturday" },
        { name: "Sunday" }
    ];
    const onDayChange = (e) => {
        setDay(e.value);
    }

    const dialogFuncMap = {
        'displayPosition': setDisplayPosition,
        'displayBasic': setDisplayBasic,
    }
    const onClick = (name, position) => {
        console.log(name, "vavava");
        dialogFuncMap[`${name}`](true);
        if (position) {
            setPosition(position);
        }
    }
    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }

    // Post Method
    function saveUser() {
        console.warn({ srno, occasion, day, date });
        let data = { srno, occasion, day, date }
        fetch(`${process.env.REACT_APP_API_KEY}/holiday`, {
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

    // get method
    useEffect(() => {
        getUsers();
    }, [])
    function getUsers() {
        fetch(`${process.env.REACT_APP_API_KEY}/holiday`).then((result) => {
            result.json().then((resp) => {
                setUsers(resp)
            })
        })
    }
    console.warn(users)

    // delete method
    function deleteUser(user) {
        console.log("id to be delete: ", user);
        fetch(`${process.env.REACT_APP_API_KEY}/holiday/${user._id}`, {
            method: 'DELETE'
        }).then((result) => {
            result.json().then((resp) => {
                console.warn(resp);
            })
        })
    }

    // update method
    function userData(data) {
        console.log("data", data)
        set_Id(data._id)
        setSrno(data.srno)
        setOccasion(data.occasion)
        setDay(data.day)
        setDate(data.date)
    }
    function updateUser(userId) {
        let item = {
            srno, occasion, day, date
        }
        console.warn("item", item)
        fetch(`${process.env.REACT_APP_API_KEY}/holiday/` + _id, {
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

    const actionBodyTemplate = (rowData) => {
        return (
            <div>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => onClick('displayBasic')} onMouseDown={() => userData(rowData)} style={{ height: "40px", width: "40px" }} />
                &nbsp;
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => deleteUser(rowData)} style={{ height: "40px", width: "40px" }} />
            </div>
        );
    }

    return (

        <div>
            {/* <h1>HOLIDAYS</h1> */}

            <div className="col">
                <Button label="Add Holidays" onClick={() => onClick('displayPosition', 'top')} style={{ backgroundColor: "lightslategray", height: '2rem' }} />
                <Dialog visible={displayPosition} position={position} modal style={{ width: '50vw' }} onHide={() => onHide('displayPosition')}>
                    <form>

                        <div className="p-fluid grid">

                            <div class="field col-12 md:col-6">
                                <label htmlFor="id" className="block"> No. </label>
                                <InputText style={{ height: "10px" }} type="text" value={srno} onChange={(e) => { setSrno(e.target.value) }} /><br /><br />
                            </div>

                            <div class="field col-12 md:col-6">
                                <label className="block"> OCCASION</label>
                                <InputText style={{ height: "10px" }} type="text" value={occasion} onChange={(e) => { setOccasion(e.target.value) }} /><br /><br />
                            </div>

                            <div class="field col-12 md:col-6"> DAY
                                <Dropdown value={day} options={days} onChange={onDayChange} optionLabel="name" optionValue="name" placeholder="Select Day" style={{ height: "35px", marginTop: "9px" }} />
                            </div>
                            <br />
                            <div class="field col-12 md:col-6">
                                <label htmlFor="date" className="block"> DATE </label>
                                <InputText style={{ height: "10px" }} type="date" value={date} onChange={(e) => { setDate(e.target.value) }} /><br /><br />
                            </div>

                            <div style={{ marginLeft: "140px" }}>
                                <Button
                                    style={{ height: "40px", width: "95px" }}
                                    label="Submit"
                                    type="button"
                                    onClick={saveUser}
                                    className="p-button-outlined" />
                                &nbsp;      &nbsp;
                                <Button
                                    style={{ height: "40px", width: "90px" }}
                                    label="Cancel"
                                    className="p-button-outlined" />
                            </div>
                        </div>
                    </form>
                </Dialog>
            </div>

            <div className="col">
                <Dialog header="Header" visible={displayBasic} style={{ width: '50vw' }} onHide={() => onHide('displayBasic')} >
                    <form>

                        <div className="p-fluid grid">

                            <div class="field col-12 md:col-6">
                                <label htmlFor="id" className="block"> No. </label>
                                <InputText style={{ height: "40px" }} type="text" value={srno} onChange={(e) => { setSrno(e.target.value) }} /><br /><br />
                            </div>

                            <div class="field col-12 md:col-6">
                                <label className="block"> OCCASION</label>
                                <InputText style={{ height: "40px" }} type="text" value={occasion} onChange={(e) => { setOccasion(e.target.value) }} /><br /><br />
                            </div>

                            <div class="field col-12 md:col-6"> DAY   <br />
                                <Dropdown value={day} options={days} onChange={onDayChange} optionLabel="name" optionValue="name" placeholder="Select Day" style={{ height: "40px", marginTop: "9px" }} />
                            </div>

                            <div class="field col-12 md:col-6">
                                <label htmlFor="date" className="block"> DATE </label>
                                <InputText style={{ height: "40px" }} type="date" value={date} onChange={(e) => { setDate(e.target.value) }} /><br /><br />
                            </div>

                            <div style={{ marginLeft: "140px" }}>
                                <Button
                                    style={{ height: "40px", width: "95px" }}
                                    label="Update"
                                    type="button"
                                    onClick={updateUser}
                                    className="p-button-outlined" />
                                &nbsp;      &nbsp;
                                <Button
                                    style={{ height: "40px", width: "90px" }}
                                    label="Cancel"
                                    className="p-button-outlined" />
                            </div>
                        </div>
                    </form>
                </Dialog>
            </div>

            <br></br>
            <div className="card">
                <DataTable value={users} size="small" className="p-datatable-customers" responsiveLayout="scroll" paginator rows={6}>
                    <Column field="srno" header="#" ></Column>
                    <Column field="occasion" header="OCCASION" ></Column>
                    <Column field="day" header="DAY" ></Column>
                    <Column field="date" header="DATE" ></Column>
                    <Column body={actionBodyTemplate} header="ACTION" exportable={false} ></Column>
                </DataTable>
            </div>
        </div>
    );
}


export default Holidays;