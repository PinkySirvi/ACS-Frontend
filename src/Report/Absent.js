import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Calendar } from 'primereact/calendar';
import { Column } from 'primereact/column';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import axios from 'axios';

const Absent = () => {
    const [month, setMonth] = useState(new Date());
    const [empid, setEmpid] = useState('');
    const [users, setUsers] = useState([]);

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
        getUsers();
    }, [])
    function getUsers() {
        fetch(`${process.env.REACT_APP_API_KEY}/absentreport`).then((result) => {
            result.json().then((resp) => {
                setUsers(resp)
            })
        })
    }
    console.warn(users)

    return (
        <div>
            <div style={{ fontFamily: "sans-serif" }}> <h2><center>ABSENT REPORT</center></h2> </div>

            <DataTable value={users} paginator rows={10}>
                <Column field="empid" header="EmpId" />
                <Column field="name" header="EmpName" />
                <Column field="date" header="Date"></Column>
                <Column field="designation" header="Designation"></Column>
                <Column field="department" header="Department"></Column>
                <Column field="shift" header="Shift"></Column>
            </DataTable>

        </div>
    );
}

export default Absent;

// import React, { useEffect, useState } from 'react';

// const AbsentReport = ({ empid }) => {
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);
//   const [absentReports, setAbsentReports] = useState([]);

//   useEffect(() => {
//     const fetchAbsentReport = async () => {
//       try {
//         const response = await fetch(`/api/absentreport/${empid}`);
//         const data = await response.json();

//         setUser(data.user);
//         setAbsentReports(data.absentReports);
//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//         // Handle error
//       }
//     };

//     fetchAbsentReport();
//   }, [empid]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>Absent Report</h1>

//       {user && (
//         <div>
//           <h2>User Information</h2>
//           <p>Empid: {user.empid}</p>
//           <p>Name: {user.name}</p>
//           <p>Designation: {user.designation}</p>
//           <p>Department: {user.department}</p>
//         </div>
//       )}

//       {absentReports.length > 0 && (
//         <div>
//           <h2>Absent Reports</h2>
//           {absentReports.map((report) => (
//             <div key={report._id}>
//               <p>Date: {report.date}</p>
//               <p>Shift: {report.shift}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AbsentReport;