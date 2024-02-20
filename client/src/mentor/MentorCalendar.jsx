import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Left from '../subpages/Left';
import '../css/mentorcalendar.css';
import GetUserDetails from '../functions/GetUserDetails';
const MentorCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { userDetails } = GetUserDetails();
  const handleDateChange = (date) => {
    setSelectedDate(date);
    const localDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    const formattedDate = localDate.toISOString().split('T')[0];
    sendDateToServer(formattedDate);
  };
  const sendDateToServer = async (formattedDate) => {
    try {
      const result = await fetch(
        `http://localhost:4001/api/mentor/report/date/${userDetails.year}/${userDetails.department}/${userDetails.section}/${userDetails.batch}/${formattedDate}`
      );
      if (result.ok) {
        const res = await result.json();
        console.log('result ', res);
      }
      console.log('Date sent successfully:', formattedDate);
    } catch (error) {
      console.error('Error sending date to server:', error);
    }
  };

  return (
    <>
      {userDetails ? (
        <>
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
            iconBg6=""
            iconText6=""
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
          <div className="calendar-mentor">
            <h3>
              {' '}
              Using the <i> react-calendar </i> library to create a calendar in
              React JS{' '}
            </h3>
            <Calendar onChange={handleDateChange} value={selectedDate} />
            {/* <p>The selected date is - {formattedDate}</p>
      {formattedDate === '2024-02-20' ? (
        <div>
          <p>HI</p>
        </div>
      ) : (
        ''
      )} */}
          </div>
        </>
      ) : (
        ''
      )}
    </>
  );
};

export default MentorCalendar;
