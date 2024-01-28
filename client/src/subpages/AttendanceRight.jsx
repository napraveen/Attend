import React from 'react';
import MentorAttendance from '../mentor/MentorAttendance';
const HomeRight = ({
  department,
  handleSubmit,
  handleCheckboxChange,
  studentAttendance,
  submissionStatus,
  userDetails,
}) => {
  return (
    <>
      {userDetails.category === 'mentor' ? (
        <MentorAttendance
          department={department}
          handleSubmit={handleSubmit}
          handleCheckboxChange={handleCheckboxChange}
          studentAttendance={studentAttendance}
          submissionStatus={submissionStatus}
          userDetails={userDetails}
        />
      ) : (
        <h1>hi</h1>
      )}
    </>
  );
};

export default HomeRight;
