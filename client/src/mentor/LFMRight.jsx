import React, { useState } from "react";
//lfm => Leave Form Mentor
import { useEffect } from "react";
import GetUserDetails from "../functions/GetUserDetails";
import "../css/leaveformmentor.css";
import axios from "axios";

const LFMRight = () => {
  const { userDetails } = GetUserDetails();

  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3050/api/files/${userDetails.year}/${userDetails.department}/${userDetails.section}`
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
  const handleVerified = async (file) => {
    const studentdata = {
      id: file._id,
      department: file.department,
    };
    const res = await axios.post(
      `http://localhost:3050/api/verified`,
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
    <div className="lfm-container">
      {" "}
      <div className="lfm-file-list">
        <h2>Uploaded Files:</h2>
        {files.length === 0 ? (
          <p style={{ marginLeft: "70px", color: "red" }}>No Datas to show</p>
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
              {files.map((file) => (
                <tbody key={file._id}>
                  <td> {file.name}</td>
                  <td> {file.regNo}</td>
                  <td>
                    {" "}
                    <a
                      href={file.imgUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "rgb(37, 158, 158)" }}
                    >
                      {file.imgUrl ? "Click Here" : ""}
                    </a>
                  </td>
                  <td>{file.reason}</td>
                  <td>{file.dates && file.dates.join(", ")}</td>
                  {file.status !== "verified" ? (
                    <td>
                      {" "}
                      <button
                        type="submit"
                        className="lfm-accept-button"
                        onClick={() => handleVerified(file)}
                      >
                        Verified
                      </button>
                    </td>
                  ) : (
                    <td>Verified</td>
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
              ))}
            </table>
          </ul>
        )}
      </div>
    </div>
  );
};

export default LFMRight;
