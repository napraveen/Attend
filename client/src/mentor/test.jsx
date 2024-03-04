// import React, { useState } from 'react';
// //lfm => Leave Form Mentor
// import { useEffect } from 'react';
// import GetUserDetails from '../functions/GetUserDetails';
// import '../css/leaveformmentor.css';
// import axios from 'axios';

// const LFMRight = () => {
//   const { userDetails } = GetUserDetails();

//   const [files, setFiles] = useState([]);

//   useEffect(() => {
//     const fetchFiles = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:4000/api/files/${userDetails.year}/${userDetails.department}/${userDetails.section}`
//         );
//         // console.log('files' + JSON.stringify(response));

//         setFiles(response.data.files);
//       } catch (error) {
//         console.error('Error fetching files:', error);
//       }
//     };

//     if (userDetails) {
//       fetchFiles();
//     }
//   }, [userDetails]);
//   return (
//     <div className="lfm-container">
//       {' '}
//       <div className="lfm-file-list">
//         <h2>Uploaded Files:</h2>
//         <ul>
//           <table>
//             <tr>
//               <th>Name</th>
//               <th>Register No</th>
//               <th>Link</th>
//               <th>Verify</th>
//               <th>Reject</th>
//             </tr>
//             {files.map((file) => (
//               <tbody key={file._id}>
//                 <td> {file.email}</td>
//                 <td> {file.email}</td>
//                 <td>
//                   {' '}
//                   <a
//                     href={`http://localhost:4000/uploads/${file.filename}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     {file.filename ? 'Click Here' : ''}
//                   </a>
//                 </td>
//                 <td>
//                   {' '}
//                   <button type="submit" className="lfm-accept-button">
//                     Verified
//                   </button>
//                 </td>
//                 <td>
//                   {' '}
//                   <button type="submit" className="lfm-reject-button">
//                     Reject
//                   </button>
//                 </td>
//               </tbody>
//             ))}
//           </table>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default LFMRight;

import React, { useState } from 'react';
//lfm => Leave Form Mentor
import { useEffect } from 'react';
import GetUserDetails from '../functions/GetUserDetails';
import '../css/leaveformmentor.css';
import axios from 'axios';

const LFMRight = () => {
  const { userDetails } = GetUserDetails();

  const [files, setFiles] = useState([]);
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3050/api/files/${userDetails.year}/${userDetails.department}/${userDetails.section}`
        );
        // console.log('files' + JSON.stringify(response));

        setFiles(response.data.files);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    if (userDetails) {
      fetchFiles();
      axios
        .get(
          `http://localhost:3050/api/files/${userDetails.year}/${userDetails.department}/${userDetails.section}`
        )
        .then((response) => {
          const byteValues = response.data.files[4].file.data.data;

          // Convert byte values to Uint8Array
          const uint8Array = new Uint8Array(byteValues);

          // Convert Uint8Array to base64 string
          const base64Image = btoa(String.fromCharCode.apply(null, uint8Array));

          // Use the correct content type from the server response
          const contentType = response.data.files[4].file.contentType;

          // Create data URL for the image
          const imageUrl = `data:${contentType};base64,${base64Image}`;

          // Set the image data in the state
          setImageData(imageUrl);

          console.log('imageurl: ' + imageUrl);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [userDetails]);
  return (
    <div className="lfm-container">
      {' '}
      <div className="lfm-file-list">
        <h2>Uploaded Files:</h2>
        <ul>
          <table>
            <tr>
              <th>Name</th>
              <th>Register No</th>
              <th>Link</th>
              <th>Verify</th>
              <th>Reject</th>
            </tr>
            {files.map((file) => (
              <tbody key={file._id}>
                <td> {file.email}</td>
                <td> {file.email}</td>
                <td>
                  {' '}
                  {imageData && (
                    <img
                      src={imageData}
                      alt="Leave Form Image"
                      style={{ maxWidth: '100%', maxHeight: '100%' }}
                    />
                  )}
                </td>
                <td>
                  {' '}
                  <button type="submit" className="lfm-accept-button">
                    Verified
                  </button>
                </td>
                <td>
                  {' '}
                  <button type="submit" className="lfm-reject-button">
                    Reject
                  </button>
                </td>
              </tbody>
            ))}
          </table>
        </ul>
      </div>
    </div>
  );
};

export default LFMRight;
