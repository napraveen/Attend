import React from 'react';
import Left from '../subpages/Left';
import GetUserDetails from '../functions/GetUserDetails';
import LeaveFormRight from '../subpages/LeaveFormRight';
import LFMRight from './LFMRight';
const LeaveForm = () => {
  const { userDetails } = GetUserDetails();
  return (
    <div>
      {userDetails ? (
        <div>
          <Left
            iconBg1=""
            iconText1=""
            iconBg2=""
            iconText2=""
            iconBg3=""
            iconText3=""
            iconBg4=""
            iconText4=""
            iconBg5=""
            iconText5=""
            iconBg6="#3D3B40"
            iconText6="white"
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
          <LFMRight />
        </div>
      ) : (
        <h1>hi</h1>
      )}
    </div>
  );
};

export default LeaveForm;
