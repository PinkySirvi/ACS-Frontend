import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const socket = io(`${process.env.REACT_APP_API_KEY}`);

function Notifications() {
//     const [notifications, setNotifications] = useState([]);

//     useEffect(() => {
//         // Listen for notification events
//         socket.on('notification', (data) => {
//             setNotifications((notifications) => [...notifications, data]);
//         });

//         return () => {
//             // Disconnect from the server when component unmounts
//             socket.disconnect();
//         };
//     }, []);

    return (
        <div> <h1>Notifications</h1></div>
//         <div>
//             <h1>Notifications</h1>
//             <ul>
//                 {notifications.map((notification, index) => (
//                     <li key={index}>{notification}</li>
//                 ))}
//             </ul>
//         </div>
    );
}

export default Notifications;