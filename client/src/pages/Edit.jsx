import React, { useEffect, useState } from "react";
import GetUserDetails from "../functions/GetUserDetails";
import Left from "../subpages/Left";
import "../css/edit.css";
import MentorEdit from "../mentor/MentorEdit";
const Home = () => {
  const { userDetails } = GetUserDetails();

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
                  iconBg2=""
                  iconText2=""
                  iconBg3="#3D3B40"
                  iconText3="white"
                  iconBg4=""
                  iconText4=""
                  iconBg5=""
                  iconText5=""
                  menu1="Dashboard"
                  menu2={
                    userDetails.category === "student"
                      ? "Leave Form"
                      : userDetails.category === "hod"
                      ? "Leaveform"
                      : "Attendance"
                  }
                  menu3="Edit"
                  menu4="Calendar"
                  menu5="Settings"
                  menu6={userDetails.category === "mentor" ? "Leave Form" : ""}
                  link1="/"
                  link2={
                    userDetails.category === "student"
                      ? "/leaveform"
                      : userDetails.category === "hod"
                      ? "/leaveform-hod"
                      : "/attendance"
                  }
                  link3={
                    userDetails.category === "student"
                      ? "/edit"
                      : userDetails.category === "hod"
                      ? "/edit"
                      : "/edit"
                  }
                  link4={
                    userDetails.category === "student"
                      ? "/student-calendar"
                      : userDetails.category === "hod"
                      ? "/hod-calendar"
                      : "/mentor-calendar"
                  }
                  link5={
                    userDetails.category === "student"
                      ? "/settings"
                      : userDetails.category === "hod"
                      ? "/settings"
                      : "/settings"
                  }
                  link6={
                    userDetails.category === "student"
                      ? "/student-leaveform"
                      : userDetails.category === "hod"
                      ? "/hod-leaveform"
                      : "/leaveform-mentor"
                  }
                />
                {userDetails.category === "mentor" ? <MentorEdit /> : ""}
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
