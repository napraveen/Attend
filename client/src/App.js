import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Attendance from './pages/Attendance';
import Edit from './pages/Edit';
import LeaveForm from './pages/LeaveForm';
import LeaveFormMentor from './mentor/LeaveFormMentor';
import LeaveFormHod from './hod/LeaveFormHod';
import MentorCalendar from './mentor/MentorCalendar';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/mentor-calendar" element={<MentorCalendar />} />
        <Route path="/leaveform" element={<LeaveForm />} />
        <Route path="/leaveform-mentor" element={<LeaveFormMentor />} />
        <Route path="/leaveform-hod" element={<LeaveFormHod />} />
      </Routes>
    </div>
  );
}

export default App;
