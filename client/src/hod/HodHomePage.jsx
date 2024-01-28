import React from 'react';
import GetUserDetails from '../functions/GetUserDetails';
import { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
const HodHomePage = ({
  data,
  department,
  handleSubmit,
  handleCheckboxChange,
  studentAttendance,
  userDetails,
}) => {
  const handleDownload = (sectionKey) => {
    const content = document.getElementById(`table-to-download-${sectionKey}`); // Use a unique identifier

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
      pdf.save(`table_content_${sectionKey}.pdf`);
    });
  };
  const [isTodayReportClicked, setTodayReportClicked] = useState(false);
  // const [isSectionClicked, setSectionClicked] = useState(false);
  const [sectionVisibility, setSectionVisibility] = useState({});

  const handleTodaysReportClick = () => {
    setTodayReportClicked(!isTodayReportClicked);
  };

  const handleSectionClick = (sectionKey) => {
    // Toggle the visibility state for the clicked section
    setSectionVisibility((prevVisibility) => ({
      ...prevVisibility,
      [sectionKey]: !prevVisibility[sectionKey],
    }));
  };

  const todayReportClass = {
    display: isTodayReportClicked ? 'block' : 'none',
  };
  // const todaySectionClass = {
  //   display: isSectionClicked ? 'block' : 'none',
  // };

  const newDate = new Date().toISOString().slice(0, 10);
  // const todayPresentStudents = data[sectionKey].filter(
  //   (item) => item.presentDates[item.presentDates.length - 1] === newDate
  // );
  const filteredSections = Object.keys(data).filter((key) => key !== '_id');
  console.log(filteredSections);
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

      {filteredSections.map((sectionKey) =>
        Array.isArray(data[sectionKey]) ? (
          <div className="home-today-report" style={todayReportClass}>
            <div
              className="home-view-section-report"
              onClick={() => handleSectionClick(sectionKey)}
            >
              <p>Section {sectionKey}</p>
            </div>
            <div
              className="home-section"
              style={{
                display: sectionVisibility[sectionKey] ? 'block' : 'none',
              }}
            >
              <button
                onClick={() => handleDownload(sectionKey)}
                className="home-download-table"
              >
                Download PDF
              </button>
              <div id={`table-to-download-${sectionKey}`}>
                <table className="home-today-table">
                  <tr>
                    <th>S.No</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Section</th>
                    <th>Roll No</th>
                    <th>Present?</th>
                  </tr>

                  {data[sectionKey].map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.department}</td>
                      <td>{item.section}</td>
                      <td>{item.rollNo}</td>
                      {item.presentDates.includes(newDate) ? (
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
        ) : (
          // enter any text here
          <h1>hi</h1>
        )
      )}
    </div>
  );
};

export default HodHomePage;

// return (
//   <div>
//     <h1>{userDetails.department} Today's Report</h1>
//     {filteredSections.map((sectionKey) => (
//       <section key={sectionKey}>
//         <h2>Section {sectionKey}</h2>
//         {Array.isArray(data[sectionKey]) ? (
//           <table>
//             <thead>
//               <tr>
//                 <th>S.No</th>
//                 <th>Name</th>
//                 <th>Department</th>
//                 <th>Section</th>
//                 <th>Roll No</th>
//                 {/* Add more table headers as needed */}
//               </tr>
//             </thead>
//             <tbody>
//               {data[sectionKey].map((item, index) => (
//                 <tr key={item._id}>
//                   <td>{index + 1}</td>
//                   <td>{item.name}</td>
//                   <td>{item.department}</td>
//                   <td>{item.section}</td>
//                   <td>{item.rollNo}</td>
//                   {/* Add more table data cells as needed */}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p>Error: Data for {sectionKey} is not in the expected format.</p>
//         )}
//       </section>
//     ))}
//   </div>
// );
