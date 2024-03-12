import React from "react";

const MentorAttendance = ({
  department,
  handleSubmit,
  handleCheckboxChange,
  studentAttendance,
  submissionStatus,
  userDetails,
}) => {
  let sno = 1;
  return (
    // <div>
    <div className="home-right">
      <div className="home-right-header">
        <h1>
          {userDetails.department} {userDetails.section} Class Attendance
        </h1>
        {submissionStatus ? (
          <div className="home-submit-div">
            <div id="home-tick">&#10004;</div> &nbsp;Submitted
          </div>
        ) : (
          <button className="home-submit-button" onClick={handleSubmit}>
            Submit
          </button>
        )}
      </div>

      <table>
        <tr>
          <th>S.No</th>
          <th>Name</th>
          <th>Department</th>
          <th>Section</th>
          <th>Roll No</th>
          <th>Present?</th>
        </tr>

        {department.map((item) => (
          <tr key={item._id}>
            <td>{sno++}</td>
            <td>{item.name}</td>
            <td>{item.department}</td>
            <td>{item.section}</td>
            <td>{item.rollNo}</td>
            <td>
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange(item._id)}
                checked={studentAttendance[item._id] || false}
              />
            </td>
          </tr>
        ))}
      </table>
    </div>
    // </div>
  );
};

export default MentorAttendance;
