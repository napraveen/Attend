import React, { useState } from "react";
//lfh => Leave Form Hod
import { useEffect } from "react";
import GetUserDetails from "../functions/GetUserDetails";
import "../css/leaveformmentor.css";
import axios from "axios";

const LFHRight = () => {
  const { userDetails } = GetUserDetails();

  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3050/api/hod/files/${userDetails.year}/${userDetails.department}/${userDetails.section}`
        );
        // console.log('files' + JSON.stringify(response));

        setFiles(response.data.files);
        console.log("res" + JSON.stringify(response.data.files));
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    if (userDetails) {
      fetchFiles();
    }
  }, [userDetails]);
  const handleAccepted = async (file) => {
    const studentdata = {
      id: file._id,
      year: file.year,
      department: file.department,
      section: file.section,
      batch: file.batch,
      regNo: file.regNo,
      dates: file.dates,
    };
    const res = await axios.post(
      `http://localhost:3050/api/accepted`,
      studentdata
    );
    console.log("hiiiiiiiiii ", res);
    if (res.status === 200) {
      console.log("Data successfully sent:", res);

      // Update the state by removing the accepted file
      setFiles((prevFiles) => prevFiles.filter((f) => f._id !== file._id));
    } else {
      console.error("Unexpected response status:", res.status);
    }
  };

  const handleRejected = async (file) => {
    const studentdata = {
      id: file._id,
      department: file.department,
    };
    const res = await axios.post(
      `http://localhost:3050/api/rejected`,
      studentdata
    );
    console.log(res);
    if (res.status === 200) {
      console.log("Data successfully sent:", res);
      setFiles((prevFiles) => prevFiles.filter((f) => f._id !== file._id));
    } else {
      console.error("Unexpected response status:", res.status);
    }
  };
  return (
    <div className="lfh-container">
      {" "}
      <div className="lfh-file-list">
        <h2>Uploaded Files:</h2>
        {files.length === 0 ? (
          <p style={{ marginLeft: "70px", color: "red" }}>No files to Show</p>
        ) : (
          <ul>
            <table>
              <tr>
                <th>Name</th>
                <th>Register No</th>
                <th>Link</th>
                <th>Reason</th>
                <th>Dates</th>
                <th>Verify</th>
                <th>Reject</th>
              </tr>

              {files.map(
                (file) => (
                  // file.status === 'verified' ? (
                  <tbody key={file._id}>
                    <td> {file.name}</td>
                    <td> {file.regNo}</td>
                    <td>
                      {" "}
                      <a
                        href={file.imgUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {file.imgUrl ? "Click Here" : ""}
                      </a>
                    </td>
                    <td>{file.reason}</td>

                    <td>
                      {file.dates &&
                        file.dates.map((date, index) => (
                          <div key={index}>{date}</div>
                        ))}
                    </td>

                    {file.status !== "Accepted" ? (
                      <td>
                        {" "}
                        <button
                          type="submit"
                          className="lfm-accept-button"
                          onClick={() => handleAccepted(file)}
                        >
                          Accepted
                        </button>
                      </td>
                    ) : (
                      <td>Accepted</td>
                    )}

                    {file.status !== "rejected" ? (
                      <td>
                        {" "}
                        <button
                          type="submit"
                          className="lfm-reject-button"
                          onClick={() => handleRejected(file)}
                        >
                          Reject
                        </button>
                      </td>
                    ) : (
                      <td>rejected</td>
                    )}
                  </tbody>
                )
                // ) : null
              )}
            </table>
          </ul>
        )}
      </div>
    </div>
  );
};

export default LFHRight;
