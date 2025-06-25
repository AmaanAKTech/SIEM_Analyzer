import { AppContext } from '../context/AppContext';
import React, { useContext } from 'react';
import useParser from '../hooks/useParser';

export default function FileUploader() {
  const { updateLogs } = useContext(AppContext);
  const { parseFile } = useParser();

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const parsed = await parseFile(file);
      updateLogs(parsed);
    }
  };

  return (
    <div className="upload-box">
      <input 
      type="file" 
      id="log-input" 
      className="hidden" 
      accept=".log,.txt,.cef,.leef"
      onChange={handleFile} />
     
      <label htmlFor="log-input" className="cursor-pointer text-blue-600 ">
        📁 Click or drag a file to upload
      </label>

    </div>
  );
}
