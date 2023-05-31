
import React, { useState, useEffect } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import axios from 'axios';


const Request = () => {

    const [selectedProducts, setSelectedProducts] = useState(null);

    const footer = (
        <span>
            {/* <Button label="Accept" icon="pi pi-check" /> &nbsp; */}
            <Button  icon="pi pi-trash"  onClick={() => deleteUser(selectedProducts)} style={{ backgroundColor: "lightslategray" }}/> 
        </span>
    );

    const footer1 = (
        <span>
            {/* <Button label="Accept" icon="pi pi-check" /> &nbsp; */}
            <Button icon="pi pi-trash"  onClick={() => deleteattendance(selectedProducts)} style={{ backgroundColor: "lightslategray" }} /> 
        </span>
    );

    const footer2 = (
        <span>
            {/* <Button label="Accept" icon="pi pi-check" /> &nbsp; */}
            <Button icon="pi pi-trash"  onClick={() => deleteresign(selectedProducts)} style={{ backgroundColor: "lightslategray" }}/>
        </span>
    );

    // get user registration
    const [users, setUsers] = useState([])
    const [selectedLeave, setSelectedLeave] = useState(null);
    const [displayConfirm, setDisplayConfirm] = useState(false);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_KEY}/signup`).then((result) => {
            result.json().then((resp) => {
                setUsers(resp)
            })
        })
    }, [])
    console.warn(users)

    const deleteUser = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_KEY}/signup/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ signupIds: selectedProducts })
            });
            const data = await response.json();
            console.log(data);
            // do something with the response data
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
            .put(`${process.env.REACT_APP_API_KEY}/signup/${selectedLeave}`, { status: 'approved' })
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


    // get attendance issue
    const [users1, setUsers1] = useState([])
    const [selectedLeave1, setSelectedLeave1] = useState(null);
    const [displayConfirm1, setDisplayConfirm1] = useState(false);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_KEY}/request`).then((result) => {
            result.json().then((resp) => {
                setUsers1(resp)
                console.log(users1);
            })
        })
    }, [])
    console.warn(users1)

    const deleteattendance = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_KEY}/request/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ requestIds: selectedProducts })
            });
            const data = await response.json();
            console.log(data);
            // do something with the response data
        } catch (error) {
            console.error('Error deleting users:', error);
        }
    };

    const approveLeave1 = (id) => {
        setSelectedLeave1(id);
        setDisplayConfirm1(true);
    };

    const confirmApprove1 = () => {
        axios
            .put(`${process.env.REACT_APP_API_KEY}/request/${selectedLeave1}`, { status: 'approved' })
            .then(() => {
                setUsers1((prevState) =>
                    prevState.map((leave) => {
                        if (leave._id === selectedLeave1) {
                            leave.status = 'approved';
                        }
                        return leave;
                    })
                );
            });
        setDisplayConfirm1(false);
    };

    const cancelApprove1 = () => {
        setSelectedLeave1(null);
        setDisplayConfirm1(false);
    };

    const statusTemplate1 = (rowData) => {
        if (rowData.status === 'pending') {
            return <span className="p-tag p-tag-warning">{rowData.status}</span>;
        } else if (rowData.status === 'approved') {
            return <span className="p-tag p-tag-success">{rowData.status}</span>;
        } else {
            return <span className="p-tag p-tag-danger">{rowData.status}</span>;
        }
    };

    const approveButtonTemplate1 = (rowData) => {
        if (rowData.status === 'pending') {
            return (
                <Button
                    label="Approve"
                    className="p-button-success"
                    onClick={() => approveLeave1(rowData._id)}
                />
            );
        }
        else {
            return null;
        }
    };


    const confirmFooter1 = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={cancelApprove1} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={confirmApprove1} />
        </>
    );


    // get resignation request
    const [users2, setUsers2] = useState([])
    const [selectedLeave2, setSelectedLeave2] = useState(null);
    const [displayConfirm2, setDisplayConfirm2] = useState(false);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_KEY}/resign`).then((result) => {
            result.json().then((resp) => {
                setUsers2(resp)
            })
        })
    }, [])
    console.warn(users2)

    const deleteresign = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_KEY}/resign/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ resignIds: selectedProducts })
            });
            const data = await response.json();
            console.log(data);
            // do something with the response data
        } catch (error) {
            console.error('Error deleting users:', error);
        }
    };

    const approveLeave2 = (id) => {
        setSelectedLeave2(id);
        setDisplayConfirm2(true);
    };

    const confirmApprove2 = () => {
        axios
            .put(`${process.env.REACT_APP_API_KEY}/resign/${selectedLeave2}`, { status: 'approved' })
            .then(() => {
                setUsers2((prevState) =>
                    prevState.map((leave) => {
                        if (leave._id === selectedLeave2) {
                            leave.status = 'approved';
                        }
                        return leave;
                    })
                );
            });
        setDisplayConfirm2(false);
    };

    const cancelApprove2 = () => {
        setSelectedLeave2(null);
        setDisplayConfirm2(false);
    };


    const  statusTemplate2 = (rowData) => {
        if (rowData.status === 'pending') {
            return <span className="p-tag p-tag-warning">{rowData.status}</span>;
        } else if (rowData.status === 'approved') {
            return <span className="p-tag p-tag-success">{rowData.status}</span>;
        } else {
            return <span className="p-tag p-tag-danger">{rowData.status}</span>;
        }
    };

    const approveButtonTemplate2 = (rowData) => {
        if (rowData.status === 'pending') {
            return (
                <Button
                    label="Approve"
                    className="p-button-success"
                    onClick={() => approveLeave2(rowData._id)}
                />
            );
        }
        else {
            return null;
        }
    };

    const confirmFooter2 = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={cancelApprove2} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={confirmApprove2} />
        </>
    );


    return (
        <div className="tabview-demo">

            <div className="card">
                <TabView className="tabview-header-icon">
                    <TabPanel header="User Registration Request" leftIcon="pi pi-user"><br/>
                        <div title="Sign-up Request">
                            <DataTable value={users} size="small" responsiveLayout="scroll" paginator rows={5}
                                selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)} footer={footer} >
                                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                                <Column field="firstname" header="Firstname" ></Column>
                                <Column field="lastname" header="Lastname" ></Column>
                                <Column field="mobile" header="Mobile Number" ></Column>
                                <Column field="email" header="Email-Id" ></Column>
                                <Column field="password" header="Password" ></Column>
                                <Column field="department" header="Department" ></Column>
                                <Column field="joiningdate" header="Joining Date" ></Column>
                                <Column field="status" header="Status" body={statusTemplate} />
                                <Column body={approveButtonTemplate} header="Action" />
                            </DataTable>
                            <Dialog
                                visible={displayConfirm}
                                onHide={cancelApprove}
                                footer={confirmFooter}
                                header="Confirm Approval"
                            >
                                <p>Are you sure you want to approve this leave request?</p>
                            </Dialog>
                        </div>
                    </TabPanel>

                    <TabPanel header="Attendance Issue" leftIcon="pi pi-calendar" ><br/>
                        <div title="Attendance Issue Request"  >
                            <DataTable value={users1} size="small" responsiveLayout="scroll" paginator rows={5}
                                selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)} footer={footer1}>
                                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                                <Column field="id" header="Id" ></Column>
                                <Column field="name" header="Name" ></Column>
                                <Column field="email" header="E-mail" ></Column>
                                <Column field="date3" header="Date" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "200px", minWidth: "70px" }}></Column>
                                <Column field="query" header="Query" ></Column>
                                <Column field="reason" header="Reason" ></Column>
                                <Column field="status" header="Status" body={statusTemplate1} />
                                <Column body={approveButtonTemplate1} header="Action" />
                            </DataTable>
                            <Dialog
                                visible={displayConfirm1}
                                onHide={cancelApprove1}
                                footer={confirmFooter1}
                                header="Confirm Approval"
                            >
                                <p>Are you sure you want to approve this leave request?</p>
                            </Dialog>
                        </div>
                    </TabPanel>

                    <TabPanel header="Resignation Request" leftIcon="pi pi-search"><br/>
                        <div title="Resignation Issue Request" >
                            <DataTable value={users2} size="small" responsiveLayout="scroll" paginator rows={5}
                                selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)} footer={footer2}>
                                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                                <Column field="firstname" header="Firstname" ></Column>
                                <Column field="middlename" header="Middlename" ></Column>
                                <Column field="lastname" header="Lastname" ></Column>
                                <Column field="email" header="E-mail" ></Column>
                                <Column field="num" header="Social Security Number" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "200px", minWidth: "50px" }}></Column>
                                <Column field="date3" header="I hereby tender my resignation as an employee of --------, Inc. to be effective on:" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "200px", minWidth: "70px" }} ></Column>
                                <Column field="lastpost" header="My last assigned post was:" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "200px", minWidth: "70px" }} ></Column>
                                <Column field="comments" header="Comments" ></Column>
                                <Column field="date4" header="Date Signed" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "200px", minWidth: "70px" }} ></Column>
                                <Column field="status" header="Status" body={statusTemplate2} />
                                <Column body={approveButtonTemplate2} header="Action" />
                            </DataTable>
                            <Dialog
                                visible={displayConfirm2}
                                onHide={cancelApprove2}
                                footer={confirmFooter2}
                                header="Confirm Approval"
                            >
                                <p>Are you sure you want to approve this leave request?</p>
                            </Dialog>
                        </div>
                    </TabPanel>

                </TabView>
            </div>

        </div>
    )
}
export default Request;
