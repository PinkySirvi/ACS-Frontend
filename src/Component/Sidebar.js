import React, { useState } from 'react';
import {
    FaTh,
    FaBusinessTime,
    FaVideo,
    FaUsers,
    FaRegFileAlt,
    FaBookReader,
    FaMapMarkerAlt,
    FaHdd,
    FaUser,
    FaUserPlus,
    FaRegListAlt
} from "react-icons/fa";
import { NavLink } from 'react-router-dom';


const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeRoute, setActiveRoute] = useState(null);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const handleRouteClick = (index) => {
        if (index === activeRoute) {
            // Clicked on the same route, close the sidebar
            setIsOpen(false);
            setActiveRoute(null);
        } else {
            setIsOpen(true);
            setActiveRoute(index);
        }
    };

    // const toggle = () => setIsOpen(!isOpen);
    const menuItem = [
        {
            path: "/",
            name: "Home",
            icon: <FaTh />
        },
        {
            path: "/machinestatus",
            name: "Machine Status",
            icon: <FaHdd />
        },
        {
            path: "/attendancemodule",
            name: "Attendance Module",
            icon: <FaBookReader />,
            isOpen: false,
            subRoutes: [
                {
                    path: "/attendancemodule/user",
                    name: "Add Employee",
                },
                {
                    path: "/attendancemodule/request",
                    name: "Employee Request",
                },
                {
                    path: "/attendancemodule/holidays",
                    name: "Employee Holidays"
                },
                {
                    path: "/attendancemodule/leaves",
                    name: "Employee Leaves"
                },
                {
                    path: "attendancemodule/emphistory",
                    name:" Employee History"
                }
            ],
        },
        {
            path: "/visitormodule",
            name: "Visitor Module",
            icon: <FaUsers />
        },
        {
            path: "/reports",
            name: "Reports",
            icon: <FaRegFileAlt />,
            subRoutes: [
                {
                    path: "/reports/monthlyattendance",
                    name: "Attendance Report",
                },
                {
                    path: "/reports/payroll",
                    name: "PayRoll Report"
                },
                {
                    path: "/reports/punchtime",
                    name: "Punch Time Report",
                },
                {
                    path: "/reports/timecard",
                    name: "Time Card Report",
                },
                {
                    path: "/reports/latecome",
                    name: "Late Coming Report",
                },
                {
                    path: "/reports/earlygoing",
                    name: "Early Going Report",
                },
                {
                    path: "/reports/absent",
                    name: "Absent Report",
                },
            ]
        },
        {
            path: "/emap",
            name: "E-Map",
            icon: <FaMapMarkerAlt />
        },
        {
            path: "/videomonitoring",
            name: "Video Monitoring",
            icon: <FaVideo />
        },
        {
            path: "/timemanagementsetting",
            name: "Time Management Setting",
            icon: <FaBusinessTime />,
            subRoutes: [
                {
                    path: "/timemanagementsetting/schedularsetting",
                    name: "Shift Schedular Setting",
                },
                {
                    path: "/timemanagementsetting/overtimesetting",
                    name: "Overtime Setting",
                },
            ],
        },
    ]
    return (
        <div className="container">
            <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
                <div className="top_section">
                    <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
                        ACS  </h1>
                    <div>
                        {" "}
                        <i
                            style={{ marginLeft: isOpen ? "150px" : "0px" }}
                            onClick={toggle}
                            id="bars"
                            className="pi pi-sign-in"
                        ></i>
                    </div>
                </div>
                {menuItem.map((item, index) => (
                    <div key={index}>
                        <NavLink
                            to={item.path}
                            className="link"
                            activeClassName="active"
                            onClick={() => handleRouteClick(index)}
                        >
                            <div className="icon">{item.icon}</div>
                            <div
                                style={{ display: isOpen ? "block" : "none" }}
                                className="link_text"
                            >
                                {item.name}
                            </div>
                        </NavLink>
                        {item.subRoutes && activeRoute === index && (
                            <div
                                className="subroutes"
                                style={{ display: isOpen ? "block" : "none" }}
                            >
                                {item.subRoutes.map((subItem, subIndex) => (
                                    <NavLink
                                        to={subItem.path}
                                        key={subIndex}
                                        className="link"
                                        activeClassName="active"
                                    >
                                        <div className="icon">{subItem.icon}</div>
                                        <div className="link_text">{subItem.name}</div>
                                    </NavLink>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <main>{children}</main>
        </div>
    );
    //  (
    //     <div className="container">
    //         <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
    //             <div className="top_section">
    //                 <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">ACS</h1>
    //                 <div> <i style={{ marginLeft: isOpen ? "150px" : "0px" }} onClick={toggle}
    //                     id="bars" className="pi pi-sign-in"></i>
    //                 </div>
    //             </div>
    //             {
    //                 menuItem.map((item, index) => (
    //                     <div key={index}>
    //                         <NavLink to={item.path} className="link" activeClassName="active">
    //                             <div className="icon">{item.icon}</div>
    //                             <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
    //                         </NavLink>
    //                         {item.subRoutes && (
    //                             <div className="subroutes" style={{ display: isOpen ? "block" : "none" }}>
    //                                 {item.subRoutes.map((subItem, subIndex) => (
    //                                     <NavLink to={subItem.path} key={subIndex} className="link" activeClassName="active">
    //                                         <div className="icon">{subItem.icon}</div>
    //                                         <div className="link_text">{subItem.name}</div>
    //                                     </NavLink>
    //                                 ))}
    //                             </div>
    //                         )}
    //                     </div>
    //                 ))
    //             }
    //         </div>
    //         <main>{children}</main>
    //     </div>
    // );
};

export default Sidebar;
