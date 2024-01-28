import React, { useEffect } from 'react';
import IsAuthenticated from '../functions/IsAuthenticated';
import { useNavigate } from 'react-router-dom';
import GetUserDetails from '../functions/GetUserDetails';
import '../css/Home.css';
import Left from '../subpages/Left';
import { useState } from 'react';
import HomeRight from '../subpages/HomeRight';
const Home = () => {
  const navigate = useNavigate();
  const { authenticated, loading } = IsAuthenticated();
  if (!authenticated) {
    navigate('/login');
  }
  const { userDetails } = GetUserDetails();
  const [data, setData] = useState([]);
  const [studentAttendance, setStudentAttendance] = useState({});
  const handleCheckboxChange = (id) => {
    setStudentAttendance({
      ...studentAttendance,
      [id]: !studentAttendance[id],
    });
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        let response = 0;
        if (userDetails.category === 'mentor') {
          response = await fetch(
            `http://localhost:4001/api/${userDetails.year}/${userDetails.department}/${userDetails.section}/classdetails`
          );
        } else if (userDetails.category === 'hod') {
          response = await fetch(
            `http://localhost:4001/api/${userDetails.year}/${userDetails.department}/departmentdetails`
          );
        }
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
  }, [authenticated, userDetails]);

  return (
    <>
      <div className="home-home_page">
        {userDetails ? (
          <>
            <div className="home-container">
              <div className="home-dashboard">
                <Left
                  iconBg1="#3D3B40"
                  iconText1="white"
                  iconBg2=""
                  iconText2=""
                  iconBg3=""
                  iconText3=""
                  iconBg4=""
                  iconText4=""
                  iconBg5=""
                  iconText5=""
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
                />
                <HomeRight
                  data={data}
                  // handleSubmit={handleSubmit}
                  handleCheckboxChange={handleCheckboxChange}
                  studentAttendance={studentAttendance}
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

export default Home;
