import React, { useEffect, useState } from 'react';
import GetUserDetails from '../functions/GetUserDetails';
import Left from '../subpages/Left';
import HomeRight from '../subpages/AttendanceRight';
import '../css/settings.css';
import axios from 'axios';
const Settings = () => {
  const { userDetails } = GetUserDetails();
  const [studentData, setStudentData] = useState({
    name: '',
    year: '',
    department: '',
    section: '',
    batch: '',
    email: '',
  });

  useEffect(() => {
    setStudentData({
      name: userDetails?.name ?? '',
      year: userDetails?.year ?? '',
      department: userDetails?.department ?? '',
      section: userDetails?.section ?? '',
      batch: userDetails?.batch ?? '',
      email: userDetails?.email ?? '',
    });
  }, [userDetails]);

  const handleEditProfile = async (e) => {
    e.preventDefault();
    await axios.post(
      `http://localhost:3050/api/${userDetails.year}/${userDetails.department}/${userDetails.section}/${userDetails.batch}/${userDetails.email}/editprofile`,
      { studentData }
    );
    setStudentData({
      name: userDetails?.name ?? '',
      year: userDetails?.year ?? '',
      department: userDetails?.department ?? '',
      section: userDetails?.section ?? '',
      batch: userDetails?.batch ?? '',
      email: userDetails?.email ?? '',
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  return (
    <>
      {userDetails ? (
        <>
          {' '}
          <Left
            iconBg1=""
            iconText1=""
            iconBg2=""
            iconText2=""
            iconBg3=""
            iconText3=""
            iconBg4=""
            iconText4=""
            iconBg5="#3D3B40"
            iconText5="white"
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
          <div className="settings-edit-profile">
            <form onSubmit={handleEditProfile}>
              <div className="settings-mentor-div">
                {' '}
                <h3>Name: </h3>{' '}
                <input
                  type="text"
                  name="name"
                  value={studentData.name}
                  onChange={handleChange}
                  placeholder="Name"
                />
              </div>
              <div className="settings-mentor-div">
                <h3>Year: </h3>
                <input
                  type="text"
                  name="year"
                  value={studentData.year}
                  onChange={handleChange}
                  placeholder="Year of Study"
                />
              </div>
              <div className="settings-mentor-div">
                <h3>Department: </h3>
                <input
                  type="text"
                  name="department"
                  value={studentData.department}
                  onChange={handleChange}
                  placeholder="Department"
                />
              </div>
              <div className="settings-mentor-div">
                <h3>Section: </h3>
                <input
                  type="text"
                  name="section"
                  value={studentData.section}
                  onChange={handleChange}
                  placeholder="Section"
                />
              </div>
              <div className="settings-mentor-div">
                <h3>Batch: </h3>
                <input
                  type="text"
                  name="batch"
                  value={studentData.batch}
                  onChange={handleChange}
                  placeholder="Batch"
                />
              </div>
              <div className="settings-mentor-div">
                <h3>Email: </h3>
                <input
                  type="email"
                  name="email"
                  value={studentData.email}
                  className="signup-email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                />
              </div>

              <button type="submit">Submit</button>
            </form>
          </div>
        </>
      ) : (
        ''
      )}
    </>
  );
};

export default Settings;
