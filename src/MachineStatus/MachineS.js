import React, { useState, useEffect, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { ScrollPanel } from 'primereact/scrollpanel';

const MachineS = () => {

    const [machinename, setMachineName] = useState("");
    const [machineid, setMachineId] = useState("");
    const [machineip, setMachineIp] = useState("");
    const [machineport, setMachinePort] = useState("");
    const [location, setLocation] = useState("");
    const [floor, setFloor] = useState("");
    const [doorno, setDoorNo] = useState("");
    const [configdate, setConfigDate] = useState("");
    const [users, setUsers] = useState([]);
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

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-eye" className="p-button-rounded mr-2" onClick={() => onClick('displayBasic')}
                    onMouseDown={() => userData(rowData)} style={{ backgroundColor: "lightslategray", height: "30px", width: "30px" }} />
            </React.Fragment>
        );
    }

    function userData(data) {
        console.log("data", data)
        setMachineId(data.machineid)
        setMachineName(data.machinename)
        setMachineIp(data.machineip)
        setMachinePort(data.machineport)
        setLocation(data.location)
        setFloor(data.floor)
        setDoorNo(data.doorno)
        setConfigDate(data.configdate)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    function saveUser() {
        console.warn({
            machineid, machinename, machineip, machineport, location, floor, doorno, configdate
        });
        let data = {
            machineid, machinename, machineip, machineport, location, floor, doorno, configdate
        }
        console.log(data);
        // `${process.env.REACT_APP_API_KEY}/add`
        fetch(`${process.env.REACT_APP_API_KEY}/machinestatus`, {
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

    useEffect(() => {
        getUsers();
    }, [])
    function getUsers() {
        fetch(`${process.env.REACT_APP_API_KEY}/machinestatus`).then((result) => {
            result.json().then((resp) => {
                setUsers(resp)
            })
        })
    }
    console.warn(users)

    //delete multiple selected rows
    const deleteMultiple = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_KEY}/machinestatus`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ machineIds: selectedProducts })
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error deleting Machines:', error);
        }
    };
    return (

        <div class="grid">

            <div class="field col-12 md:col-12" style={{ display: "flex", height: "60px" }} >
                &nbsp;
                <div>
                    <Button icon="pi pi-user-plus" onClick={() => onClick('displayBasic2')} style={{ backgroundColor: "lightslategray" }} />
                    <Dialog visible={displayBasic2} style={{ width: '50vw', height: "40vw" }} onHide={() => onHide('displayBasic2')} >
                        <form onSubmit={handleSubmit}>

                            <div className="p-fluid grid">

                                <div class="field col-12 md:col-6">
                                    <label htmlFor="empid" className="block">Machine Id </label>
                                    <InputText style={{ height: "10px" }} type="text" value={machineid} onChange={(e) => { setMachineId(e.target.value) }} required /><br /><br />
                                </div>

                                <div class="field col-12 md:col-6">
                                    <label htmlFor="name" className="block"> Machine Name </label>
                                    <InputText style={{ height: "10px" }} type="text" value={machinename} onChange={(e) => { setMachineName(e.target.value) }} required /><br /><br />
                                </div>

                                <div class="field col-12 md:col-6">
                                    <label htmlFor="email" className="block"> Machine IP</label>
                                    <InputText style={{ height: "10px" }} type="text" value={machineip} onChange={(e) => { setMachineIp(e.target.value) }} required /><br /><br />
                                </div>

                                <div class="field col-12 md:col-6">
                                    <label htmlFor="username1" className="block"> Machine Port </label>
                                    <InputText style={{ height: "10px" }} type="text" value={machineport} onChange={(e) => { setMachinePort(e.target.value) }} /><br /><br />
                                </div>

                                <div class="field col-12 md:col-6">
                                    <label htmlFor="username1" className="block"> Location </label>
                                    <InputText style={{ height: "10px" }} type="text" value={location} onChange={(e) => { setLocation(e.target.value) }} name="mobile" /><br /><br />
                                </div>

                                <div class="field col-12 md:col-6">
                                    <label htmlFor="name" className="block"> Floor</label>
                                    <InputText style={{ height: "10px" }} type="text" value={floor} onChange={(e) => { setFloor(e.target.value) }} /><br /><br />
                                </div>

                                <div class="field col-12 md:col-6">
                                    <label htmlFor="name" className="block"> Door No </label>
                                    <InputText style={{ height: "10px" }} type="text" value={doorno} onChange={(e) => { setDoorNo(e.target.value) }} /><br /><br />
                                </div>

                                <div class="field col-12 md:col-6">
                                    <label htmlFor="date" className="block"> Config Date </label>
                                    <InputText style={{ height: "10px" }} type="date" value={configdate} onChange={(e) => { setConfigDate(e.target.value) }} required /><br /><br />
                                </div>

                                <div style={{ marginLeft: "140px" }}>
                                    <Button
                                        style={{ height: "30px", width: "95px" }}
                                        label="Submit"
                                        onClick={saveUser}
                                        type="button"
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
                &nbsp;
                <div>
                    <Button icon="pi pi-trash"
                        onClick={() => deleteMultiple(selectedProducts)} style={{ backgroundColor: "lightslategray" }} />
                </div>


                <div className='col'>
                    <Dialog visible={displayBasic} style={{ width: '50vw' }} onHide={() => onHide('displayBasic')}>
                        <form onSubmit={handleSubmit}>
                        <ScrollPanel style={{ height: '50vh', color: "gray" }}>
                            <div className="p-fluid grid">

                                <div class="field col-12 md:col-6">
                                    <label htmlFor="empid" className="block">Machine Id </label>
                                    <InputText style={{ height: "10px" }} type="text" value={machineid} onChange={(e) => { setMachineId(e.target.value) }} /><br /><br />
                                </div>

                                <div class="field col-12 md:col-6">
                                    <label htmlFor="name" className="block"> Machine Name </label>
                                    <InputText style={{ height: "10px" }} type="text" value={machinename} onChange={(e) => { setMachineName(e.target.value) }} /><br /><br />
                                </div>

                                <div class="field col-12 md:col-6">
                                    <label htmlFor="email" className="block"> Machine IP</label>
                                    <InputText style={{ height: "10px" }} type="text" value={machineip} onChange={(e) => { setMachineIp(e.target.value) }} /><br /><br />
                                </div>

                                <div class="field col-12 md:col-6">
                                    <label htmlFor="username1" className="block"> Machine Port </label>
                                    <InputText style={{ height: "10px" }} type="text" value={machineport} onChange={(e) => { setMachinePort(e.target.value) }} /><br /><br />
                                </div>

                                <div class="field col-12 md:col-6">
                                    <label htmlFor="username1" className="block"> Location </label>
                                    <InputText style={{ height: "10px" }} type="text" value={location} onChange={(e) => { setLocation(e.target.value) }} name="mobile" /><br /><br />
                                </div>

                                <div class="field col-12 md:col-6">
                                    <label htmlFor="name" className="block"> Floor</label>
                                    <InputText style={{ height: "10px" }} type="text" value={floor} onChange={(e) => { setFloor(e.target.value) }} /><br /><br />
                                </div>

                                <div class="field col-12 md:col-6">
                                    <label htmlFor="name" className="block"> Door No </label>
                                    <InputText style={{ height: "10px" }} type="text" value={doorno} onChange={(e) => { setDoorNo(e.target.value) }} /><br /><br />
                                </div>

                                <div class="field col-12 md:col-6">
                                    <label htmlFor="date" className="block"> Config Date </label>
                                    <InputText style={{ height: "10px" }} type="date" value={configdate} onChange={(e) => { setConfigDate(e.target.value) }} /><br /><br />
                                </div>

                            </div>
                            </ScrollPanel>
                        </form>

                    </Dialog>
                </div>

            </div>

            <div >
                <DataTable value={users} size="small" responsiveLayout="scroll" paginator rows={8}
                    selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)} >
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                    <Column field="machineid" header="Machine Id" ></Column>
                    <Column field="machinename" header="Name" ></Column>
                    <Column field="status" header="Status" ></Column>
                    <Column field="health" header="Health"></Column>
                    <Column field="machineip" header="Ip" ></Column>
                    <Column header="action" body={actionBodyTemplate}></Column>
                </DataTable>
            </div>


        </div>
    )
}
export default MachineS;