import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.jpeg';
import MaterialIcon from 'material-icons-react';
import GetUserDetails from '../functions/GetUserDetails';
import Attendance from '../pages/Attendance';
const Left = ({
  iconBg1,
  iconText1,
  iconBg2,
  iconText2,
  iconBg3,
  iconText3,
  iconBg4,
  iconText4,
  iconBg5,
  iconBg6,
  iconText5,
  iconText6,
  menu1,
  menu2,
  menu3,
  menu4,
  menu5,
  menu6,
  link1,
  link2,
}) => {
  const { userDetails } = GetUserDetails();
  return (
    <div className="home-left">
      <div className="home-logo">
        <Link to="#" id="home-logo">
          <img src={logo} alt="" />
          <span>
            {userDetails ? (
              //change this line as needed
              <h2>
                {userDetails.department} {userDetails.section}
              </h2>
            ) : (
              <h2>Loading...</h2>
            )}
          </span>
        </Link>
      </div>
      <div className="home-sidebar">
        <Link to="/">
          <div
            className="home-group-icon-text"
            style={{ backgroundColor: iconBg1 }}
            title="Dashboard"
          >
            <div
              className="home-icons-bg"
              id="home-dashboard-id"
              onclick="active()"
            >
              <span className="home-material-symbols-outlined">
                <MaterialIcon icon="dashboard" id="home-icon-color-1" />
              </span>
            </div>
            <p style={{ color: iconText1 }}>{menu1}</p>
          </div>
        </Link>
        <Link to={link2}>
          <div
            className="home-group-icon-text"
            style={{ backgroundColor: iconBg2 }}
            title="Attendance"
          >
            <div className="home-icons-bg">
              <span className="home-material-symbols-outlined">
                <MaterialIcon icon="person" id="home-icon-color-2" />
              </span>
            </div>
            <p style={{ color: iconText2 }}>{menu2}</p>
          </div>
        </Link>
        <Link to="/edit">
          <div
            className="home-group-icon-text"
            style={{ backgroundColor: iconBg3 }}
            title="Edit"
          >
            <div className="home-icons-bg">
              <span className="home-material-symbols-outlined">
                <MaterialIcon icon="edit" id="home-icon-color-4" />
              </span>
            </div>
            <p style={{ color: iconText3 }}>{menu3}</p>
          </div>
        </Link>
        <Link to="#">
          <div
            className="home-group-icon-text"
            style={{ backgroundColor: iconBg4 }}
            title="Calendar"
          >
            <div className="home-icons-bg">
              <span className="home-material-symbols-outlined">
                <MaterialIcon icon="calendar_today" id="home-icon-color-3" />
              </span>
            </div>
            <p style={{ color: iconText4 }}>{menu4}</p>
          </div>
        </Link>

        <Link to="#">
          <div
            className="home-group-icon-text"
            style={{ backgroundColor: iconBg5 }}
            title="Settings"
          >
            <div className="home-icons-bg">
              <span className="home-material-symbols-outlined">
                <MaterialIcon icon="settings" id="home-icon-color-4" />
              </span>
            </div>
            <p style={{ color: iconText5 }}>{menu5}</p>
          </div>
        </Link>
        {menu6 ? (
          <Link to="/leaveform-mentor">
            <div
              className="home-group-icon-text"
              style={{ backgroundColor: iconBg6 }}
              title="LeaveForm"
            >
              <div className="home-icons-bg">
                <span className="home-material-symbols-outlined">
                  <MaterialIcon icon="person" id="home-icon-color-2" />
                </span>
              </div>
              <p style={{ color: iconText6 }}>{menu6}</p>
            </div>
          </Link>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Left;
