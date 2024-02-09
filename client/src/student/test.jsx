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
  const [formStatus, setFormStatus] = useState([]);
  // useEffect(() => {
  //   const fetchStudentData = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:4001/api/${userDetails.year}/${userDetails.department}/${userDetails.section}/${userDetails.email}/studentdetails`
  //       );
  //       if (response.ok) {
  //         const studentData = await response.json();
  //         console.log(studentData);
  //         setStudentData(studentData); // Update state with fetched data
  //       } else {
  //         throw new Error('Failed to fetch data');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   const statusChecker = async () => {
  //     const response = await fetch(
  //       `http://localhost:4001/api/${userDetails.department}/${userDetails.email}/statuschecker`
  //     );
  //   };
  //   fetchStudentData();

  //   statusChecker();
  // }, [authenticated, userDetails]);
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4001/api/${userDetails.year}/${userDetails.department}/${userDetails.section}/${userDetails.email}/studentdetails`
        );
        if (response.ok) {
          const studentData = await response.json();
          console.log(studentData);
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
          `http://localhost:4001/api/${userDetails.department}/${userDetails.email}/statuschecker`
        );

        if (response.ok) {
          const data = await response.json();
          console.log('Status Checker Data:', data.found[0].status);
          setFormStatus(data.found[0]);
          console.log('hii', data.found[0]);
          if (data.found[0].status === 'verified') {
            document
              .querySelector('.student-dashboard-status')
              .classList.add('verified');
          }

          // You can handle the data as needed
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
          <div className="student-dashboard-accepted-days">
            <h1>Leave Form Accepted:</h1>
            <h2>{studentdata[0].acceptedDates.length || 0}</h2>
          </div>
          {formStatus ? (
            <div>
              {' '}
              <div className="student-dashboard-status-header">
                <div>
                  <h3>Leave Form</h3>
                </div>

                <div className="student-dashboard-status">
                  {formStatus.status ? (
                    <p>{formStatus.status}</p>
                  ) : (
                    <p>submitted</p>
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <h1>hi</h1>
      )}
    </>
  );
};

export default StudentHomePage;
