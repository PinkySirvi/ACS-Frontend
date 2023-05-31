import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import axios from 'axios';

const Leaves = () => {

    const [users, setUsers] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [selectedLeave, setSelectedLeave] = useState(null);
    const [displayConfirm, setDisplayConfirm] = useState(false);

    const footer = (
        <span>
            <Button icon="pi pi-trash"  onClick={() => deleteleaves(selectedProducts)} style={{ backgroundColor: "lightslategray" }}/> 
        </span>
    );

    // get method
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_KEY}/leaves`).then((result) => {
            result.json().then((resp) => {
                setUsers(resp)
            })
        })
    }, [])
    console.warn(users)

    const deleteleaves = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_KEY}/leaves/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ leavesIds: selectedProducts })
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error deleting users:', error);
        }
    };

    const acceptleaves = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_KEY}/leaves/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ leavesIds: selectedProducts })
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error deleting users:', error);
        }
    };

    const approveLeave = (id) => {
        setSelectedLeave(id);
        setDisplayConfirm(true);
    };

    const confirmApprove = () => {
        axios
            .put(`${process.env.REACT_APP_API_KEY}/leaves/${selectedLeave}`, { status: 'approved' })
            .then(() => {
                setUsers((prevState) =>
                    prevState.map((leave) => {
                        if (leave._id === selectedLeave) {
                            leave.status = 'approved';
                        }
                        return leave;
                    })
                );
            });
        setDisplayConfirm(false);
    };

    const cancelApprove = () => {
        setSelectedLeave(null);
        setDisplayConfirm(false);
    };

    const statusTemplate = (rowData) => {
        if (rowData.status === 'pending') {
            return <span className="p-tag p-tag-warning">{rowData.status}</span>;
        } else if (rowData.status === 'approved') {
            return <span className="p-tag p-tag-success">{rowData.status}</span>;
        } else {
            return <span className="p-tag p-tag-danger">{rowData.status}</span>;
        }
    };

    const approveButtonTemplate = (rowData) => {
        if (rowData.status === 'pending') {
            return (
                <Button
                    label="Approve"
                    className="p-button-success"
                    onClick={() => approveLeave(rowData._id)}
                />
            );
        }
        else {
            return null;
        }
    };

    const confirmFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={cancelApprove} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={confirmApprove} />
        </>
    );

    return (
        <div>

            <div className="card">
                <h2>Employee's Leave</h2><br/>
                    <DataTable value={users} size="small" responsiveLayout="scroll" paginator rows={5} footer={footer}
                        selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}>
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                        <Column field="employeename" header="Employee Name"></Column>
                        <Column field="leavetype" header="Leave Type"></Column>
                        <Column field="from" header="From"></Column>
                        <Column field="to" header="To"></Column>
                        <Column field="reason" header="Reason"></Column>
                        <Column field="status" header="Status" body={statusTemplate}></Column>
                        <Column header="Action" body={approveButtonTemplate}  ></Column>
                    </DataTable>
                    <Dialog
                        visible={displayConfirm}
                        onHide={cancelApprove}
                        footer={confirmFooter}
                        header="Confirm Approval" >
                        <p>Are you sure you want to approve this leave request?</p>
                    </Dialog>
            </div>

        </div>
    );
};
export default Leaves;

