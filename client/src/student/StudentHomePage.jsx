import React, { useEffect, useState } from 'react';
import GetUserDetails from '../functions/GetUserDetails';
import IsAuthenticated from '../functions/IsAuthenticated';
import { useNavigate } from 'react-router-dom';
import '../css/student.css';
const StudentHomePage = () => {
  const navigate = useNavigate();
  const { authenticated, loading } = IsAuthenticated();
  // if (!authenticated) {
  //   navigate('/login');
  // }
  const { userDetails } = GetUserDetails();
  const [studentdata, setStudentData] = useState([]);

  const [formStatus, setFormStatus] = useState({});
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3050/api/${userDetails.year}/${userDetails.department}/${userDetails.section}/${userDetails.batch}/${userDetails.email}/studentdetails`
        );
        if (response.ok) {
          const studentData = await response.json();
          // console.log(studentData);
          setStudentData(studentData); // Update state with fetched data
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const statusChecker = async () => {
      try {
        const response = await fetch(
          `http://localhost:3050/api/${userDetails.year}/${userDetails.department}/${userDetails.section}/${userDetails.batch}/${userDetails.email}/statuschecker`
        );

        if (response.ok) {
          const data = await response.json();
          setFormStatus(data);

          // console.log('form status = ', formStatus);
          // console.log('the data is ', data);
        } else {
          throw new Error('Failed to fetch status checker data');
        }
      } catch (error) {
        console.error('Error fetching status checker data:', error);
      }
    };

    fetchStudentData();
    statusChecker();
  }, [authenticated, userDetails]);
  const getColor = (status) => {
    console.log(formStatus);
    if (status === 'Applied') {
      // console.log('hiihihhhi', status);
      return 'rgb(242, 242, 146)';
    } else if (status === 'Not Applied') {
      // console.log('hiihihhhi', status);
      return 'rgb(239, 169, 167)';
    } else if (status === 'verified') {
      return ' rgb(242, 205, 146)';
    } else if (status === 'Accepted') {
      return 'rgb(157, 240, 165)';
    }
    // Default color if status is neither 'Applied' nor 'Not Applied'
    return ''; // You can set a default color here if needed
  };

  return (
    <>
      {studentdata.length > 0 ? (
        <div className="student-dashboard-container">
          <div className="student-dashboard-title">
            <h1>My Data</h1>
          </div>
          <div className="student-dashboard-attendance">
            <div className="student-dashboard-present-days">
              <h1>Present Days:</h1>
              <h2>{studentdata[0].presentCount || 0}</h2>
            </div>
            <div className="student-dashboard-absent-days">
              <h1>Absent Days:</h1>
              <h2>{studentdata[0].absentCount || 0}</h2>
            </div>
          </div>
          <div>
            {Object.keys(formStatus).map((date) => (
              <div key={date} className="student-dashboard-status-header">
                <div>
                  <h3>{date}</h3>
                </div>
                <div
                  className="student-dashboard-status"
                  style={{ backgroundColor: getColor(formStatus[date]) }}
                >
                  <p>{formStatus[date]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h1>hi</h1>
      )}
    </>
  );
};

export default StudentHomePage;
