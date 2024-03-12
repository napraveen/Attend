import React, { useEffect, useState } from "react";
import GetUserDetails from "../functions/GetUserDetails";
import Left from "../subpages/Left";
import HomeRight from "../subpages/AttendanceRight";
import "../css/settings.css";
import axios from "axios";
import MentorSettings from "../mentor/MentorSettings";
import HodSettings from "../hod/HodSettings";
import StudentSettings from "../student/StudentSettings";
const Settings = () => {
  const { userDetails } = GetUserDetails();

  return (
    <>
      {userDetails ? (
        <>
          {" "}
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
          {userDetails.category === "mentor" ? (
            <MentorSettings />
          ) : userDetails.category === "hod" ? (
            <HodSettings />
          ) : userDetails.category === "student" ? (
            <StudentSettings />
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Settings;
