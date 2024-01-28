import React from 'react';
import GetUserDetails from '../functions/GetUserDetails';
import { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
const MentorHomePage = ({
  data,
  department,
  handleSubmit,
  handleCheckboxChange,
  studentAttendance,
  userDetails,
}) => {
  let sno = 1;
  const handleDownload = () => {
    const content = document.getElementById('table-to-download');

    if (!content) {
      console.error('Table element not found!');
      return;
    }

    html2canvas(content, { scale: 2 }).then((canvas) => {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210; // A4 size
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('table_content.pdf');
    });
  };
  const [isTodayReportClicked, setTodayReportClicked] = useState(false);

  const handleTodaysReportClick = () => {
    setTodayReportClicked(!isTodayReportClicked);
  };

  const todayReportClass = {
    display: isTodayReportClicked ? 'block' : 'none',
  };

  const newDate = new Date().toISOString().slice(0, 10);
  const todayPresentStudents = data.filter(
    (item) => item.presentDates[item.presentDates.length - 1] === newDate
  );
  return (
    <div className="home-right">
      <div className="home-right-header">
        <h1>
          {' '}
          {userDetails.department} {userDetails.section} Today's Report
        </h1>
      </div>
      <div className="home-view-today-report" onClick={handleTodaysReportClick}>
        <p>View Today Report</p>
      </div>
      <div className="home-today-report" style={todayReportClass}>
        <button onClick={handleDownload} className="home-download-table">
          Download PDF
        </button>
        <div id="table-to-download">
          <table className="home-today-table">
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Department</th>
              <th>Section</th>
              <th>Roll No</th>
              <th>Present?</th>
            </tr>

            {data.map((item) => (
              <tr key={item._id}>
                <td>{sno++}</td>
                <td>{item.name}</td>
                <td>{item.department}</td>
                <td>{item.section}</td>
                <td>{item.rollNo}</td>
                {todayPresentStudents.some(
                  (student) => student._id === item._id
                ) ? (
                  <td style={{ backgroundColor: 'rgb(146, 255, 132)' }}>
                    Present
                  </td>
                ) : (
                  <td style={{ backgroundColor: 'rgb(254, 158, 158)' }}>
                    Absent
                  </td>
                )}
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default MentorHomePage;
