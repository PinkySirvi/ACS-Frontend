import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { ScrollPanel } from 'primereact/scrollpanel';


const AnnouncementPage = () => {
    const [announcement, setAnnouncement] = useState('');
    const [postedAnnouncements, setPostedAnnouncements] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [employees, setEmployees] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');

    const handleDepartmentChange = (event) => {
        setSelectedDepartment(event.target.value);
    };

    // Function to handle the "Select All" checkbox change event
    const handleSelectAllChange = (event) => {
        const isChecked = event.target.checked;
        setSelectAll(isChecked);

        // If "Select All" is checked, select all employees
        // Otherwise, deselect all employees
        if (isChecked) {
            const allEmployeeIds = employees.map((employee) => employee.id);
            setSelectedEmployees(allEmployeeIds);
        } else {
            setSelectedEmployees([]);
        }
    };

    // Function to handle individual employee checkbox change event
    const handleEmployeeCheckboxChange = (event) => {
        const employeeId = event.target.value;

        // Update the selectedEmployees array based on the checkbox selection
        setSelectedEmployees((prevSelectedEmployees) => {
            if (prevSelectedEmployees.includes(employeeId)) {
                return prevSelectedEmployees.filter((id) => id !== employeeId);
            } else {
                return [...prevSelectedEmployees, employeeId];
            }
        });
    };

    // get method for Department
    useEffect(() => {

        const fetchDepartments = async () => {
            try {

                // Fetch the department data from the API or data source
                const response = await fetch(`${process.env.REACT_APP_API_KEY}/announcements`);
                const data = await response.json();

                // Set the departments state with the retrieved data
                setDepartments(data.departments);
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        };

        fetchDepartments();
    }, []);


    // get method for employee
    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_KEY}/user`);
            const data = await response.json();
            setEmployees(data);
        } catch (error) {
            console.log('Error fetching employees:', error);
        }
    };

    // Post Method
    function saveUser() {
        console.warn({
            announcement
        });
        let data = {
            announcement
        }
        // `${process.env.REACT_APP_API_KEY}/add`
        fetch(`${process.env.REACT_APP_API_KEY}/announcement`, {
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

    const handleInputChange = (event) => {
        setAnnouncement(event.target.value);
    };

    const handlePostAnnouncement = () => {
        if (announcement.trim() !== '' && selectedOption !== '') {
            switch (selectedOption) {
                case 'all':
                    // Logic for posting to all employees
                    break;
                case 'selected':
                    // Logic for posting to selected employees
                    break;
                case 'department':
                    if (selectedDepartment !== '') {
                        // Logic for posting to the selected department
                    }
                    break;
                default:
                    break;
            }

            setPostedAnnouncements([...postedAnnouncements, announcement]);
            setAnnouncement('');
            setSelectedOption('');
        }
    };


    return (
        <div className="content-wrapper">
            <div>
                <h3>Create Announcement</h3>

                <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                    <option value="">Select Option</option>
                    <option value="all">All Employees</option>
                    <option value="selected">Selected Employees</option>
                    <option value="department">Department</option>
                </select>
                <br /><br />

                {selectedOption === 'selected' && (
                    <div style={{ height: "200px", overflow: "auto" }}>
                        {/* <h4>Select Employees:</h4> */}
                        {employees.map((employee) => (
                            <div key={employee.id}>
                                <input
                                    type="checkbox"
                                    id={employee.id}
                                    name={employee.name}
                                    value={employee.id}
                                />
                                <label htmlFor={employee.id}>{employee.name}</label>
                            </div>
                        ))}
                    </div>
                )}

                {selectedOption === 'all' && (
                    <div style={{ height: '200px', overflow: 'auto' }}>
                        <div>
                            <input
                                type="checkbox"
                                id="select-all"
                                name="select-all"
                                checked={selectAll}
                                onChange={handleSelectAllChange}
                            />
                            <label htmlFor="select-all">Select All</label>
                        </div>
                        {employees.map((employee) => (
                            <div key={employee.id}>
                                <input
                                    type="checkbox"
                                    id={employee.id}
                                    name={employee.name}
                                    value={employee.id}
                                    checked={selectedEmployees.includes(employee.id)}
                                    onChange={handleEmployeeCheckboxChange}
                                />
                                <label htmlFor={employee.id}>{employee.name}</label>
                            </div>
                        ))}
                    </div>
                )}

                {selectedOption === 'department' && (
                    <div>
                        <select value={selectedDepartment} onChange={handleDepartmentChange}>
                            <option value="">Select Department</option>
                            {departments.map((department) => (
                                <option key={department.id} value={department.id}>
                                    {department.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <input
                    type="text"
                    value={announcement}
                    onChange={handleInputChange}
                    placeholder="Enter your announcement"
                    style={{ height: "80px", width: "400px" }}
                />
                <br /><br />

                <Button onClick={handlePostAnnouncement} onMouseDown={saveUser} style={{ height: "10px", backgroundColor: "lightslategray" }}>
                    POST
                </Button>

            </div>
            <br />
            <div>
                <Card>
                    <ScrollPanel style={{ height: '10vh', color: "gray" }}>
                        <h2>Posted Announcements</h2>
                        {postedAnnouncements.length === 0 ? (
                            <p>No announcements posted yet.</p>
                        ) : (
                            postedAnnouncements.map((announcement, index) => (
                                <div key={index}>
                                    <h3>Announcement #{index + 1}</h3>
                                    <p>{announcement}</p>
                                </div>
                            ))
                        )}
                    </ScrollPanel>
                </Card>
            </div>
        </div>
    );
};

export default AnnouncementPage;
