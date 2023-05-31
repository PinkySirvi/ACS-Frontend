import React, { useState } from 'react';
import axios from 'axios';

function UploadForm() {
    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [empid, setEmpId] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', name);
        formData.append('empid', empid);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_KEY}/user`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);

            setFile(null);
            setName('');
            setEmpId('');

            alert('File uploaded successfully!');
        } catch (error) {
            console.error(error);
            alert('Error uploading file. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="file">Select File:</label>
                <input type="file" id="file" onChange={handleFileChange} />
            </div>

            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div>
                <label htmlFor="empid">Employee ID:</label>
                <input type="text" id="empid" value={empid} onChange={(e) => setEmpId(e.target.value)} />
            </div>

            <button type="submit">Submit</button>
        </form>
    );
}

export default UploadForm;