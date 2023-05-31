import './App.css';

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons

import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Sidebar from './Component/Sidebar';
import Navbar from './Component/Navbar';
import Home from './Component/Home';
import MachineS from './MachineStatus/MachineS';
import AttendanceModule from './Attendance/AttendanceModule';
import User from './Attendance/User';
import Request from './Attendance/Request';
import MonthlyAttendance from './Report/MonthlyAttendance';
import Holidays from './Attendance/Holidays';
import Leaves from './Attendance/Leaves';
import EmpHistory from './Attendance/EmpHistory';
import VisitorModule from './Visitor/VisitorModule';
import Reports from './Report/Reports';
import LateCome from './Report/LateCome';
import EarlyGoing from './Report/EarlyGoing';
import Absent from './Report/Absent';
import PayRoll from './Report/PayRoll';
import PunchTime from './Report/PunchTime';
import TimeCard from './Report/TimeCard';
import Emap from './EMapping/Emap';
import VideoM from './VideoMonitoring/VideoM';
import Settings from './Component/Settings';
import Notifications from './Component/Notifications';
import Logs from './Component/Logs';
import SchedularSetting from './TimeSetting/SchedularSetting';
import OvertimeSetting from './TimeSetting/OvertimeSetting';
import AddSchedule from './TimeSetting/AddSchedule';
import AddOvertime from './TimeSetting/AddOvertime';
import Announcement from './Component/Announcement';
import Details from './Visitor/Details';
import History from './Visitor/History';
import UploadForm from './Component/UploadForm';
import HolidaysCopy from './EmployeeScreen/HolidaysCopy';
import LeavesCopy from './EmployeeScreen/LeavesCopy';
import Resign from './EmployeeScreen/Resign';
import Main from './EmployeeScreen/Main';

function App() {

  return (
    <div className="App">
      {/* <UploadForm/> */}

      <BrowserRouter>

        <Navbar />
        <Sidebar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/machinestatus" element={<MachineS />} />
            <Route path="/attendancemodule/user" element={<User />} />
            <Route path="/attendancemodule/request" element={<Request />} />
            <Route path="/attendancemodule/holidays" element={<Holidays />} />
            <Route path="/attendancemodule/leaves" element={<Leaves />} />
            <Route path="/attendancemodule/emphistory" element={<EmpHistory />} />
            <Route path="/visitormodule" element={<VisitorModule />} />
            <Route path="/reports/monthlyattendance" element={<MonthlyAttendance />} />
            <Route path="/reports/payroll" element={<PayRoll />} />
            <Route path="/reports/punchtime" element={<PunchTime />} />
            <Route path="/reports/timecard" element={<TimeCard />} />
            <Route path="/reports/latecome" element={<LateCome />} />
            <Route path="/reports/earlygoing" element={<EarlyGoing />} />
            <Route path="/reports/absent" element={<Absent />} />
            <Route path="/emap" element={<Emap />} />
            <Route path="/videomonitoring" element={<VideoM />} />
            <Route path="/timemanagementsetting/schedularsetting" element={<SchedularSetting />} />
            <Route path="/timemanagementsetting/overtimesetting" element={<OvertimeSetting />} />
          </Routes>
        </Sidebar>

        <Routes>

          <Route path="/settings" element={<Settings />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/announcement" element={<Announcement />} />
          <Route path="/addschedule" element={<AddSchedule />} />
          <Route path="/schedularsetting" element={<SchedularSetting />} />
          <Route path="/addovertime" element={<AddOvertime />} />
          <Route path="/overtimesetting" element={<OvertimeSetting />} />
          <Route path="/history" element={<History />} />
          <Route path="/details" element={<Details />} />

        </Routes>

      </BrowserRouter>

      {/*  <BrowserRouter>
        <Navbar />
        <h2>Welcome  User</h2>
        <br />
        <Main />
        <Routes>

          <Route path="/holidayscopy" element={<HolidaysCopy />} />
          <Route path="/leavescopy" element={<LeavesCopy />} />
          <Route path="/resign" element={<Resign />} />
      
        </Routes>
      </BrowserRouter> */}

    </div>
  );
}

export default App;
