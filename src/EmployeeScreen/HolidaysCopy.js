
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';


const HolidaysCopy = () => {
    const [users, setUsers] = useState('');

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


    return (

        <div>
            <h1>HOLIDAYS</h1>

            <br></br>
            <div className="card">
                <DataTable value={users} size="small" responsiveLayout="scroll" paginator rows={10}>
                    <Column field="srno" header="#" style={{ minWidth: '6rem' }}></Column>
                    <Column field="occasion" header="OCCASION" style={{ minWidth: '15rem' }}></Column>
                    <Column field="day" header="DAY" style={{ minWidth: '15rem' }}></Column>
                    <Column field="date" header="DATE" style={{ minWidth: '15rem' }}></Column>
                </DataTable>
            </div>
        </div>
    );
}


export default HolidaysCopy;