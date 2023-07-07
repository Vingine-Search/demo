// import React, { useState } from "react";
import axios from "axios";
// function VideoUpload() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const handleFileInputChange = (event) => {
//     console.log(event.target.files[0])
//     setSelectedFile(event.target.files[0]);
//   };
//   const handleFileUpload = () => {
//     const formData = new FormData();
//     formData.append("video", selectedFile);
//     console.log(formData)
//     // axios
//     //   .post("http://grad-vm.westeurope.cloudapp.azure.com:8000/upload", formData)
//     //   .then((response) => {
//     //     console.log("Upload successful!");
//     //   })
//     //   .catch((error) => {
//     //     console.error("Error uploading video: ", error);
//     //   });
//   };

//   return (
//     <div>
//       <h1>Video Upload</h1>
//       <input type="file" onChange={handleFileInputChange}  accept=".mov,.mp4" />
//       <button onClick={handleFileUpload}>Upload</button>
//     </div>
//   );
// }
// export default VideoUpload;

import React, { useState } from 'react';
import '../css/Upload.css'

const VideoUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysisType, setAnalysisType] = useState('both');
  const [title, setTitle] = useState("");
  const handleAnalysisChange = (event) => {
    setAnalysisType(event.target.value);
  };
  
  return (
    <form action={`http://grad-vm.westeurope.cloudapp.azure.com:8000/upload?analysis=${analysisType}&title=${title}`} method="POST" enctype="multipart/form-data">
     <div className='span1'></div>
     <label>
       <input
          type="radio"
          name="analysisType"
          value="audio"
          checked={analysisType === "audio"}
          onChange={handleAnalysisChange} />
        Audio
      </label>
      <label>
        <input
          type="radio"
          name="analysisType"
          value="video"
          checked={analysisType === "video"}
          onChange={handleAnalysisChange} />
        Video
      </label>
         <input type="file" name="video" />
         <input type="submit"/>
         <input
              className="Input_style"
              placeholder="write title here"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
      </form>
  );
};

export default VideoUpload;