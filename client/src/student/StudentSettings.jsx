import React, { useEffect, useState } from "react";
import GetUserDetails from "../functions/GetUserDetails";
import "../css/settings.css";
import axios from "axios";
const StudentSettings = () => {
  const { userDetails } = GetUserDetails();

  const [studentData, setStudentData] = useState({
    name: "",
    year: "",
    department: "",
    section: "",
    batch: "",
    email: "",
    username: "",
    // rollNo: "",
    // registerNo: "",
    // mobileNo: "",
  });

  useEffect(() => {
    setStudentData({
      name: userDetails?.name ?? "",
      year: userDetails?.year ?? "",
      department: userDetails?.department ?? "",
      section: userDetails?.section ?? "",
      batch: userDetails?.batch ?? "",
      email: userDetails?.email ?? "",
      username: userDetails?.username ?? "",
      // rollNo: userDetails?.rollNo ?? "",
      // registerNo: userDetails?.registerNo ?? "",
      // mobileNo: userDetails?.mobileNo ?? "",
    });
  }, [userDetails]);

  const handleEditProfile = async (e) => {
    e.preventDefault();
    await axios.post(
      `http://localhost:3050/api/${userDetails.year}/${userDetails.department}/${userDetails.section}/${userDetails.batch}/${userDetails.email}/student/editprofile`,
      { studentData }
    );
    setStudentData({
      name: userDetails?.name ?? "",
      year: userDetails?.year ?? "",
      department: userDetails?.department ?? "",
      section: userDetails?.section ?? "",
      batch: userDetails?.batch ?? "",
      email: userDetails?.email ?? "",
      username: userDetails?.username ?? "",
      // rollNo: userDetails?.rollNo ?? "",
      // registerNo: userDetails?.registerNo ?? "",
      // mobileNo: userDetails?.mobileNo ?? "",
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  return (
    <>
      <div className="settings-edit-profile">
        <form onSubmit={handleEditProfile}>
          <h1>My Profile</h1>

          <div className="settings-mentor-div">
            {" "}
            <h3>Name: </h3>{" "}
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
              readOnly
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
              readOnly
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
              readOnly
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
              readOnly
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
              readOnly
              className="signup-email"
              placeholder="Enter your email"
              onChange={handleChange}
            />
          </div>
          <div className="settings-mentor-div">
            <h3>Username: </h3>
            <input
              type="username"
              name="username"
              value={studentData.username}
              readOnly
              className="signup-username"
              placeholder="Enter your username"
              onChange={handleChange}
            />
          </div>
          {/* <div className="settings-mentor-div">
            <h3>Roll No: </h3>
            <input
              type="rollNo"
              name="rollNo"
              value={studentData.rollNo}
              readOnly
              className="signup-rollNo"
              placeholder="Enter your rollNo"
              onChange={handleChange}
            />
          </div>
          <div className="settings-mentor-div">
            <h3>Register No: </h3>
            <input
              type="registerNo"
              name="registerNo"
              value={studentData.registerNo}
              readOnly
              className="signup-registerNo"
              placeholder="Enter your registerNo"
              onChange={handleChange}
            />
          </div>
          <div className="settings-mentor-div">
            <h3>Mobile No: </h3>
            <input
              type="mobileNo"
              name="mobileNo"
              value={studentData.mobileNo}
              readOnly
              className="signup-mobileNo"
              placeholder="Enter your mobileNo"
              onChange={handleChange}
            />
          </div> */}
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default StudentSettings;
