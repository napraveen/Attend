import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MentorCalendar = () => {
  const [date, changeDate] = useState(new Date());

  function changeValue(val) {
    changeDate(val);
  }

  // Format date as YYYY/MM/DD
  const formattedDate = date
    .toLocaleDateString('en-CA')
    .split('/')
    .reverse()
    .join('/');

  return (
    <div>
      <h3>
        {' '}
        Using the <i> react-calender </i> library to create calender in React JS{' '}
      </h3>
      <Calendar onChange={changeValue} value={date} />
      <p>The selected date is - {formattedDate}</p>
    </div>
  );
};

export default MentorCalendar;
