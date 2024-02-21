import React, { useEffect } from 'react';
import IsAuthenticated from '../functions/IsAuthenticated';
import { useNavigate } from 'react-router-dom';
import GetUserDetails from '../functions/GetUserDetails';
import '../css/Home.css';
import Left from '../subpages/Left';
import { useState } from 'react';
import AttendanceRight from '../subpages/AttendanceRight';
const Attendance = () => {
  const navigate = useNavigate();
  const { authenticated, loading } = IsAuthenticated();
  if (!authenticated) {
    navigate('/login');
  }
  const { userDetails } = GetUserDetails();
  const [data, setData] = useState([]);
  const [studentAttendance, setStudentAttendance] = useState({});
  const [submissionStatus, setsubmissionStatus] = useState(false);
  const handleCheckboxChange = (id) => {
    setStudentAttendance({
      ...studentAttendance,
      [id]: !studentAttendance[id], // Toggle the checked status for the student
    });
  };
  const handleSubmit = async () => {
    const presentStudents = data.filter((item) => studentAttendance[item._id]);
    const absentStudents = data.filter((item) => !studentAttendance[item._id]);

    try {
      const response = await fetch(
        `http://localhost:4001/api/updateAttendance/${userDetails.year}/${userDetails.department}/${userDetails.section}/${userDetails.batch}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ presentStudents, absentStudents }),
        }
      );

      if (response.ok) {
        console.log('Attendance updated successfully');
        setsubmissionStatus(true);
        // You might want to reset the state after successful submission

        setStudentAttendance({});
      } else {
        throw new Error('Failed to update attendance');
      }
    } catch (error) {
      console.error('Error updating attendance:', error);
    }
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(
          `http://localhost:4001/api/${userDetails.year}/${userDetails.department}/${userDetails.section}/${userDetails.batch}/classdetails`
        );
        if (response.ok) {
          const studentsData = await response.json();
          setData(studentsData); // Update state with fetched data
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchStudents();

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4001/api/submissionstatus/${
            userDetails.department + userDetails.section
          }`
        );
        if (response.ok) {
          const data = await response.json();
          let submissionStatus = false;
          if (data.message === 'true') {
            submissionStatus = true;
          }
          console.log('Submission Status:', submissionStatus);
          setsubmissionStatus(submissionStatus);
        } else {
          throw new Error('Failed to fetch submission status');
        }
      } catch (error) {
        console.error('Error fetching submission status:', error);
      }
    };

    if (userDetails) {
      fetchData();
    }
  }, [authenticated, userDetails]);

  return (
    <>
      <div className="home-home_page">
        {userDetails ? (
          <>
            <div className="home-container">
              <div className="home-dashboard">
                <Left
                  iconBg1=""
                  iconText1=""
                  iconBg2="#3D3B40"
                  iconText2="white"
                  iconBg3=""
                  iconText3=""
                  iconBg4=""
                  iconText4=""
                  iconBg5=""
                  iconText5=""
                  iconBg6=""
                  iconText6=""
                  menu1="Dashboard"
                  menu2={
                    userDetails.category === 'student'
                      ? 'Leave Form'
                      : userDetails.category === 'hod'
                      ? 'Leaveform'
                      : 'Attendance'
                  }
                  menu3="Edit"
                  menu4="Calendar"
                  menu5="Settings"
                  menu6={userDetails.category === 'mentor' ? 'Leave Form' : ''}
                  link1="/"
                  link2={
                    userDetails.category === 'student'
                      ? '/leaveform'
                      : userDetails.category === 'hod'
                      ? '/leaveform-hod'
                      : '/attendance'
                  }
                  link3={
                    userDetails.category === 'student'
                      ? '/edit'
                      : userDetails.category === 'hod'
                      ? '/edit'
                      : '/edit'
                  }
                  link4={
                    userDetails.category === 'student'
                      ? '/student-calendar'
                      : userDetails.category === 'hod'
                      ? '/hod-calendar'
                      : '/mentor-calendar'
                  }
                  link5={
                    userDetails.category === 'student'
                      ? '/settings'
                      : userDetails.category === 'hod'
                      ? '/settings'
                      : '/settings'
                  }
                  link6={
                    userDetails.category === 'student'
                      ? '/student-leaveform'
                      : userDetails.category === 'hod'
                      ? '/hod-leaveform'
                      : '/leaveform-mentor'
                  }
                />
                <AttendanceRight
                  department={data}
                  handleSubmit={handleSubmit}
                  handleCheckboxChange={handleCheckboxChange}
                  studentAttendance={studentAttendance}
                  submissionStatus={submissionStatus}
                  userDetails={userDetails}
                />
              </div>
            </div>
          </>
        ) : (
          <p>Loading user details...</p>
        )}
      </div>
    </>
  );
};

export default Attendance;
