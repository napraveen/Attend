import React, { useState } from 'react';
import '../css/leaveform.css';
import { useEffect } from 'react';
import GetUserDetails from '../functions/GetUserDetails';
import Left from '../subpages/Left';
import { Link } from 'react-router-dom';
import axios from 'axios';

//firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const LeaveFormRight = () => {
  const { userDetails } = GetUserDetails();
  const [isAddStudentClassClicked, setisAddStudentClassClicked] =
    useState(true);
  const addStudentClass = () => {
    setisAddStudentClassClicked(!isAddStudentClassClicked);
  };
  const [selectedDates, setSelectedDates] = useState([]);

  //firebase
  // const [imgUrl, setImgUrl] = useState('');
  const [absentDates, setAbsentDates] = useState([]);

  const studentFormClass = {
    display: isAddStudentClassClicked ? 'none' : 'block',
  };

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const [studentData, setStudentData] = useState({
    year: '',
    department: '',
    section: '',
    email: '',
    name: '',
    regNo: '',
    imgUrl: '',
    reason: 'medicalleave',
    selectedDates: '',
  });

  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Update studentData when userDetails change
    setStudentData({
      year: userDetails?.year ?? '',
      department: userDetails?.department ?? '',
      section: userDetails?.section ?? '',
      email: userDetails?.email ?? '',
      name: '',
      regNo: '',
      reason: 'medicalleave',
      selectedDates: '',
    });

    // const fetchFiles = async () => {
    //   try {
    //     const response = await axios.get(
    //       `http://localhost:4000/api/files/${userDetails.year}/${userDetails.department}/${userDetails.section}`
    //     );
    //     // console.log('files' + JSON.stringify(response));

    //     setFiles(response.data.files);
    //   } catch (error) {
    //     console.error('Error fetching files:', error);
    //   }
    // };

    // if (userDetails) {
    //   fetchFiles();
    // }
    const fetchAbsentDates = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4001/api/${userDetails.year}/${userDetails.department}/${userDetails.section}/${userDetails.email}/absentdates`
        );

        setAbsentDates(response.data.unAppliedDates);
        console.log('hi ' + JSON.stringify(response.data.unAppliedDates));
      } catch (error) {
        console.error('Error fetching absent dates:', error);
      }
    };
    if (userDetails) {
      fetchAbsentDates();
    }
  }, [userDetails]);
  console.log('Filesss:', files);
  const handleSubmitAddStudent = async (e) => {
    try {
      e.preventDefault();
      //firebase
      const currentISTTime = new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
      });
      const formattedISTTime = currentISTTime.replace(/[/,:\sAPMapm]/g, '');

      // const fileName = `${formattedISTTime}`;
      // // const fileName = `${formattedISTTime}-{userDetails.regNo}`

      // const storageRef = firebase.storage().ref();
      // const fileRef = storageRef.child(`${fileName}`);
      // await fileRef.put(file);
      // const downloadURL = await fileRef.getDownloadURL();
      let downloadURL = null;

      if (file) {
        const fileName = `${formattedISTTime}`;

        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(`${fileName}`);

        try {
          await fileRef.put(file);
          downloadURL = await fileRef.getDownloadURL();
        } catch (error) {
          console.error(
            'Error uploading or getting download URL from Firebase:',
            error
          );
        }
      }

      // setStudentData((prevStudentData) => ({
      //   ...prevStudentData,
      //   imgUrl: downloadURL,
      // }));
      const updatedStudentData = {
        ...studentData,
        imgUrl: downloadURL,
        appliedDates: selectedDates,
      };

      console.log('updatedstudentdata ' + JSON.stringify(updatedStudentData));

      await axios.post(
        `http://localhost:4001/api/${userDetails.year}/${userDetails.department}/${userDetails.section}/submitleaveform`,
        updatedStudentData
      );
      // const { success, message } = data;
      setStudentData({
        year: '',
        department: '',
        section: '',
        email: '',
        imgUrl: '',
        name: '',
        regNo: '',
        reason: '',
      });
      setFile(null);
    } catch (err) {
      console.error('Error adding student:', err);
    }
  };

  const handleCheckboxChange = (e) => {
    const { value } = e.target;

    // Check if the value is already in the selectedDates array
    if (selectedDates.includes(value)) {
      // If it is, remove it
      setSelectedDates((prevSelectedDates) =>
        prevSelectedDates.filter((date) => date !== value)
      );
    } else {
      // If it is not, add it
      setSelectedDates((prevSelectedDates) => [...prevSelectedDates, value]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };
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
                <div className="edit-right">
                  <div className="edit-add-a-student" onClick={addStudentClass}>
                    <p>Submit Leave Form</p>
                  </div>

                  <div style={studentFormClass} className="edit-add-student">
                    {absentDates.length > 0 ? (
                      <form onSubmit={handleSubmitAddStudent}>
                        <input
                          type="text"
                          name="year"
                          value={studentData.year}
                          onChange={handleChange}
                          placeholder="Year of Study"
                        />
                        <input
                          type="text"
                          name="department"
                          value={studentData.department}
                          onChange={handleChange}
                          placeholder="Department"
                        />
                        <input
                          type="text"
                          name="section"
                          value={studentData.section}
                          onChange={handleChange}
                          placeholder="Section"
                        />
                        <input
                          type="email"
                          name="email"
                          value={studentData.email}
                          className="signup-email"
                          placeholder="Enter your email"
                          onChange={handleChange}
                        />
                        <input
                          type="text"
                          name="name"
                          value={studentData.name}
                          className="signup-name"
                          placeholder="Enter your Name"
                          onChange={handleChange}
                        />
                        <input
                          type="text"
                          name="regNo"
                          value={studentData.regNo}
                          className="signup-regNo"
                          placeholder="Enter your Register Number"
                          onChange={handleChange}
                        />
                        <input
                          type="file"
                          name="file"
                          onChange={handleFileChange}
                        />

                        <label for="dropdown">Select an option:</label>
                        <select
                          id="lfr-reason-dropdown"
                          name="reason"
                          value={studentData.reason}
                          onChange={handleChange}
                        >
                          <option value="medicalleave">Medical Leave</option>
                          <option value="privilegeleave">
                            Previlege Leave
                          </option>
                          <option value="others">Others</option>
                        </select>
                        {/* {absentDates ? (         */}
                        <div className="lfr-leavedates">
                          {absentDates.map((date) => (
                            <div key={date} className="lfr-leavedate">
                              <input
                                type="checkbox"
                                id={`absent-date-${date}`}
                                name="absentDates"
                                value={date}
                                onChange={handleCheckboxChange}
                              />
                              <label htmlFor={`absent-date-${date}`}>
                                {date}
                              </label>
                            </div>
                          ))}
                        </div>
                        {/* ) : (
                        <></>
                      )}      */}

                        <button type="submit">Submit</button>
                      </form>
                    ) : (
                      <h3>
                        Leave(s) Not Taken / Already Submitted all Leave Forms
                      </h3>
                    )}
                  </div>
                </div>
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

export default LeaveFormRight;

// import React, { useState } from 'react';
// import '../css/leaveform.css';
// import { useEffect } from 'react';
// import GetUserDetails from '../functions/GetUserDetails';
// import Left from '../subpages/Left';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// const LeaveFormRight = () => {
//   const { userDetails } = GetUserDetails();
//   const [isAddStudentClassClicked, setisAddStudentClassClicked] =
//     useState(true);
//   const addStudentClass = () => {
//     setisAddStudentClassClicked(!isAddStudentClassClicked);
//   };
//   const studentFormClass = {
//     display: isAddStudentClassClicked ? 'none' : 'block',
//   };

//   const [studentData, setStudentData] = useState({
//     year: '',
//     department: '',
//     section: '',
//     email: '',
//   });
//   useEffect(() => {
//     // Update studentData when userDetails change
//     setStudentData({
//       year: userDetails?.year ?? '',
//       department: userDetails?.department ?? '',
//       section: userDetails?.section ?? '',
//       email: '',
//     });
//   }, [userDetails]);
//   const handleSubmitAddStudent = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(
//         `http://localhost:4000/api/${userDetails.year}/${userDetails.department}/${userDetails.section}/submitleaveform`,
//         studentData
//       );
//       // const { success, message } = data;
//       setStudentData({
//         year: '',
//         department: '',
//         section: '',
//         email: '',
//       });
//     } catch (err) {
//       console.error('Error adding student:', err);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setStudentData({ ...studentData, [name]: value });
//   };
//   return (
//     <>
//       <div className="home-home_page">
//         {userDetails ? (
//           <>
//             <div className="home-container">
//               <div className="home-dashboard">
//                 <Left
//                   iconBg1=""
//                   iconText1=""
//                   iconBg2="#3D3B40"
//                   iconText2="white"
//                   iconBg3=""
//                   iconText3=""
//                   iconBg4=""
//                   iconText4=""
//                   iconBg5=""
//                   iconText5=""
//                   menu1="Dashboard"
//                   menu2={
//                     userDetails.category === 'student'
//                       ? 'Leave Form'
//                       : 'DashBoard'
//                   }
//                   menu3="Edit"
//                   menu4="Calendar"
//                   menu5="Settings"
//                   link1="/"
//                   link2={
//                     userDetails.category === 'student'
//                       ? '/leaveform'
//                       : '/attendance'
//                   }
//                 />
//                 <div className="edit-right">
//                   <div className="edit-add-a-student" onClick={addStudentClass}>
//                     <p>Add a student</p>
//                   </div>

//                   <div style={studentFormClass} className="edit-add-student">
//                     <form onSubmit={handleSubmitAddStudent}>
//                       <input
//                         type="text"
//                         name="year"
//                         value={studentData.year}
//                         onChange={handleChange}
//                         placeholder="Year of Study"
//                       />
//                       <input
//                         type="text"
//                         name="department"
//                         value={studentData.department}
//                         onChange={handleChange}
//                         placeholder="Department"
//                       />
//                       <input
//                         type="text"
//                         name="section"
//                         value={studentData.section}
//                         onChange={handleChange}
//                         placeholder="Section"
//                       />
//                       <input
//                         type="email"
//                         name="email"
//                         value={studentData.email}
//                         className="signup-email"
//                         placeholder="Enter your email"
//                         onChange={handleChange}
//                       />
//                       <button type="submit">Submit</button>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </>
//         ) : (
//           <p>Loading user details...</p>
//         )}
//       </div>
//     </>
//   );
// };

// export default LeaveFormRight;
