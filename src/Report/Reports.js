import React from "react";
function Reports(){
    return(
        <div>Here,You have Reports</div>
    )
}
export default Reports;



// import React, { useState } from 'react';
// import {
//     FaTh,
//     FaBusinessTime,
//     FaVideo,
//     FaUsers,
//     FaRegFileAlt,
//     FaBookReader,
//     FaMapMarkerAlt,
//     FaHdd,
//     FaUser,
//     FaUserPlus,
//     FaRegListAlt
// } from "react-icons/fa";
// import { NavLink } from 'react-router-dom';


// const Sidebar = ({ children }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const toggle = () => setIsOpen(!isOpen);
//     const menuItem = [
//         {
//             path: "/",
//             name: "Home",
//             icon: <FaTh />
//         },
//         {
//             path: "/machinestatus",
//             name: "Machine Status",
//             icon: <FaHdd />
//         },
//         {
//             path: "/attendancemodule",
//             name: "Attendance Module",
//             icon: <FaBookReader />,
//             subRoutes: [
//                 {
//                     path: "/attendancemodule/user",
//                     name: "Add Employee",
//                     // icon: <FaUser />
//                 },
//                 {
//                     path: "/attendancemodule/request",
//                     name: "Employee Request",
//                     // icon:<FaUserPlus/>
//                 },
//                 {
//                     path: "/attendancemodule/monthlyattendance",
//                     name: "Attendance Report",
//                     // icon:<FaRegListAlt/>
//                 },
//                 {
//                     path: "/attendancemodule/holidays",
//                     name: "Employee Holidays"
//                 },
//                 {
//                     path: "/attendancemodule/leaves",
//                     name: "Employee Leaves"
//                 }
//             ],
//         },
//         {
//             path: "/visitormodule",
//             name: "Visitor Module",
//             icon: <FaUsers />
//         },
//         {
//             path: "/reports",
//             name: "Reports",
//             icon: <FaRegFileAlt />
//         },
//         {
//             path: "/emap",
//             name: "E-Map",
//             icon: <FaMapMarkerAlt />
//         },
//         {
//             path: "/videomonitoring",
//             name: "Video Monitoring",
//             icon: <FaVideo />
//         },
//         {
//             path: "/timemanagementsetting",
//             name: "Time Management Setting",
//             icon: <FaBusinessTime />,
//             subRoutes: [
//                 {
//                     path: "/timemanagementsetting/schedularsetting",
//                     name: "Shift Schedular Setting",
//                 },
//                 {
//                     path: "/timemanagementsetting/overtimesetting",
//                     name: "Overtime Setting",
//                 },
//             ],
//         },
//     ]
//     return (
//         <div className="container">
//             <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
//                 <div className="top_section">
//                     <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
//                         ACS
//                     </h1>
//                     <div>
//                         {" "}
//                         <i
//                             style={{ marginLeft: isOpen ? "150px" : "0px" }}
//                             onClick={toggle}
//                             id="bars"
//                             className="pi pi-sign-in"
//                         ></i>
//                     </div>
//                 </div>
//                 {menuItem.map((item, index) => (
//                     <div key={index}>
//                         <NavLink
//                             to={item.path}
//                             className="link"
//                             activeClassName="active"
//                             onClick={() => {
//                                 if (item.subRoutes) setIsOpen(!isOpen);
//                             }}
//                         >
//                             <div className="icon">{item.icon}</div>
//                             <div
//                                 style={{ display: isOpen ? "block" : "none" }}
//                                 className="link_text"
//                             >
//                                 {item.name}
//                             </div>
//                         </NavLink>
//                         {item.subRoutes && (
//                             <div
//                                 className="subroutes"
//                                 style={{ display: isOpen ? "block" : "none" }}
//                             >
//                                 {item.subRoutes.map((subItem, subIndex) => (
//                                     <NavLink
//                                         to={subItem.path}
//                                         key={subIndex}
//                                         className="link"
//                                         activeClassName="active"
//                                     >
//                                         <div className="icon">{subItem.icon}</div>
//                                         <div className="link_text">{subItem.name}</div>
//                                     </NavLink>
//                                 ))}
//                             </div>
//                         )}
//                     </div>
//                 ))}
//             </div>
//             <main>{children}</main>
//         </div>
//     );
//     //  (
//     //     <div className="container">
//     //         <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
//     //             <div className="top_section">
//     //                 <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">ACS</h1>
//     //                 <div> <i style={{ marginLeft: isOpen ? "150px" : "0px" }} onClick={toggle}
//     //                     id="bars" className="pi pi-sign-in"></i>
//     //                 </div>
//     //             </div>
//     //             {
//     //                 menuItem.map((item, index) => (
//     //                     <div key={index}>
//     //                         <NavLink to={item.path} className="link" activeClassName="active">
//     //                             <div className="icon">{item.icon}</div>
//     //                             <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
//     //                         </NavLink>
//     //                         {item.subRoutes && (
//     //                             <div className="subroutes" style={{ display: isOpen ? "block" : "none" }}>
//     //                                 {item.subRoutes.map((subItem, subIndex) => (
//     //                                     <NavLink to={subItem.path} key={subIndex} className="link" activeClassName="active">
//     //                                         <div className="icon">{subItem.icon}</div>
//     //                                         <div className="link_text">{subItem.name}</div>
//     //                                     </NavLink>
//     //                                 ))}
//     //                             </div>
//     //                         )}
//     //                     </div>
//     //                 ))
//     //             }
//     //         </div>
//     //         <main>{children}</main>
//     //     </div>
//     // );
// };

// export default Sidebar;
