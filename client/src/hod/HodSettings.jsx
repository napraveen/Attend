import React, { useEffect, useState } from "react";
import GetUserDetails from "../functions/GetUserDetails";
import "../css/settings.css";
import axios from "axios";
const HodSettings = () => {
  const { userDetails } = GetUserDetails();

  const [mentorData, setMentorData] = useState({
    name: "",
    year: "",
    department: "",
    batch: "",
    email: "",
  });

  useEffect(() => {
    setMentorData({
      name: userDetails?.name ?? "",
      year: userDetails?.year ?? "",
      department: userDetails?.department ?? "",
      batch: userDetails?.batch ?? "",
      email: userDetails?.email ?? "",
    });
  }, [userDetails]);

  const handleEditProfile = async (e) => {
    e.preventDefault();
    await axios.post(
      `http://localhost:3050/api/${userDetails.email}/hod/editprofile`,
      {
        mentorData,
      }
    );
    setMentorData({
      name: userDetails?.name ?? "",
      year: userDetails?.year ?? "",
      department: userDetails?.department ?? "",
      batch: userDetails?.batch ?? "",
      email: userDetails?.email ?? "",
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMentorData({ ...mentorData, [name]: value });
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
              value={mentorData.name}
              onChange={handleChange}
              placeholder="Name"
            />
          </div>
          <div className="settings-mentor-div">
            <h3>Year: </h3>
            <input
              type="text"
              name="year"
              value={mentorData.year}
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
              value={mentorData.department}
              readOnly
              onChange={handleChange}
              placeholder="Department"
            />
          </div>
          <div className="settings-mentor-div">
            <h3>Batch: </h3>
            <input
              type="text"
              name="batch"
              value={mentorData.batch}
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
              value={mentorData.email}
              readOnly
              className="signup-email"
              placeholder="Enter your email"
              onChange={handleChange}
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default HodSettings;
