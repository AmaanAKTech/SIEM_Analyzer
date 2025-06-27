import React, { useContext, useRef, useState } from 'react';
import { AppContext } from '../context/AppContext';
import useParser from '../hooks/useParser';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function FileUploader() {
  const { updateLogs } = useContext(AppContext);
  const { parseFile } = useParser();
  const [isDragging, setIsDragging] = useState(false);
  const dropRef = useRef();

  const handleFile = async (file) => {
    const allowedTypes = ['text/plain', 'application/octet-stream'];
    const isValidType = file.name.match(/\.(log|txt|cef|leef)$/i);

    if (!isValidType) {
      toast.error('❌ Unsupported file type. Please upload a .log, .txt, .cef, or .leef file.');
      return;
    }

    const parsed = await parseFile(file);
    updateLogs(parsed);
    toast.success(`✅ File "${file.name}" uploaded successfully!`);
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="w-full flex justify-center mt-8">
      <div
        ref={dropRef}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`transition-all duration-300 rounded-xl px-6 py-8 w-full max-w-xl text-center cursor-pointer
          ${isDragging ? 'bg-blue-100' : 'bg-white'}
          shadow-sm hover:shadow-md hover:bg-blue-50`}
      >
        <input
          type="file"
          id="log-input"
          className="hidden"
          accept=".log,.txt,.cef,.leef"
          onChange={handleInputChange}
        />

        <label htmlFor="log-input" className="flex flex-col items-center gap-3 text-gray-600">
          <span className="text-4xl">📂</span>
          <span className="text-base font-medium">
            {isDragging ? 'Drop your file here' : 'Click or drag a file to upload'}
          </span>
          <span className="text-xs text-gray-400">(Supported: .log, .txt, .cef, .leef)</span>
        </label>
      </div>
    </div>
  );
}
