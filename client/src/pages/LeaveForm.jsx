import React from 'react';
import Left from '../subpages/Left';
import GetUserDetails from '../functions/GetUserDetails';
import LeaveFormRight from '../subpages/LeaveFormRight';
const LeaveForm = () => {
  const { userDetails } = GetUserDetails();
  return (
    <div>
      {userDetails ? (
        <div>
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
          <LeaveFormRight />
        </div>
      ) : (
        <h1>hi</h1>
      )}
    </div>
  );
};

export default LeaveForm;
